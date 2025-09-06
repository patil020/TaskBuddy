package com.taskbuddy.websocket;

import com.taskbuddy.security.JwtService;
import com.taskbuddy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

/**
 * Handshake interceptor that authenticates WebSocket connections using
 * JWT tokens passed either as a query parameter (token) or in the
 * Authorization header. When a valid token is found, the user's ID
 * is stored in the session attributes for use by the
 * {@link NotificationWebSocketHandler}.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class NotificationHandshakeInterceptor implements HandshakeInterceptor {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final UserDetailsService userDetailsService; // <-- NEW

    @Override
    public boolean beforeHandshake(ServerHttpRequest request,
                                   ServerHttpResponse response,
                                   WebSocketHandler wsHandler,
                                   Map<String, Object> attributes) {
        // Try query param ?token=...
        URI uri = request.getURI();
        String query = uri.getQuery();
        if (query != null) {
            for (String param : query.split("&")) {
                if (param.startsWith("token=")) {
                    String token = param.substring("token=".length());
                    token = URLDecoder.decode(token, StandardCharsets.UTF_8);
                    // Strip "Bearer " if present
                    if (token.startsWith("Bearer%20")) {
                        token = token.substring("Bearer%20".length());
                    } else if (token.startsWith("Bearer ")) {
                        token = token.substring("Bearer ".length());
                    }
                    if (authenticateToken(token, attributes)) {
                        return true;
                    }
                }
            }
        }

        // Fallback: Authorization header
        List<String> authHeaders = request.getHeaders().get("Authorization");
        if (authHeaders != null) {
            for (String header : authHeaders) {
                if (header != null && header.startsWith("Bearer ")) {
                    String token = header.substring("Bearer ".length());
                    if (authenticateToken(token, attributes)) {
                        return true;
                    }
                }
            }
        }

        // No valid token
        return false;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request,
                               ServerHttpResponse response,
                               WebSocketHandler wsHandler,
                               Exception exception) {
        // No-op
    }

    /**
     * Validate JWT and store userId in attributes.
     */
    private boolean authenticateToken(String token, Map<String, Object> attributes) {
        try {
            String usernameOrEmail = jwtService.extractUsername(token);
            if (usernameOrEmail == null || usernameOrEmail.isBlank()) return false;

            // Load user and validate token against UserDetails (API expects 2 args)
            UserDetails userDetails = userDetailsService.loadUserByUsername(usernameOrEmail);
            if (!jwtService.isTokenValid(token, userDetails)) {
                return false;
            }

            // Try both email and username
            var userOpt = userRepository.findByEmail(usernameOrEmail)
                    .or(() -> userRepository.findByUsername(usernameOrEmail));
            if (userOpt.isPresent()) {
                attributes.put("userId", userOpt.get().getId());
                return true;
            }
        } catch (Exception e) {
            log.warn("WebSocket token authentication failed: {}", e.getMessage());
        }
        return false;
    }
}

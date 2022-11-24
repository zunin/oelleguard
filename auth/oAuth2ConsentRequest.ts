export interface OAuth2ConsentRequest {
    challenge:                       string;
    requested_scope:                 string[];
    requested_access_token_audience: any[];
    skip:                            boolean;
    subject:                         string;
    oidc_context:                    OidcContext;
    client:                          Client;
    request_url:                     string;
    session_id:                      string;
}

export interface Client {
    client_id:                    string;
    client_name:                  string;
    redirect_uris:                string[];
    grant_types:                  string[];
    response_types:               string[];
    scope:                        string;
    audience:                     any[];
    owner:                        string;
    policy_uri:                   string;
    allowed_cors_origins:         any[];
    tos_uri:                      string;
    client_uri:                   string;
    logo_uri:                     string;
    contacts:                     any[];
    client_secret_expires_at:     number;
    subject_type:                 string;
    jwks:                         OidcContext;
    token_endpoint_auth_method:   string;
    userinfo_signed_response_alg: string;
    created_at:                   Date;
    updated_at:                   Date;
    metadata:                     OidcContext;
}

export interface OidcContext {
}

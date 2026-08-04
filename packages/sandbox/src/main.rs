use axum::{
    extract::State,
    http::StatusCode,
    routing::{get, post},
    Json, Router,
};
use fabrika_sandbox::{execute_extension, validate_manifest, ExtensionManifest};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Clone)]
struct AppState {
    _placeholder: (),
}

#[derive(Deserialize)]
struct ExecuteRequest {
    /// Base64-encoded WASM bytes
    wasm_base64: String,
    /// Extension manifest (permissions, limits)
    manifest: ExtensionManifest,
}

#[derive(Serialize)]
struct ExecuteResponse {
    success: bool,
    output: Option<String>,
    error: Option<String>,
    cpu_used_ms: u64,
    memory_used_bytes: u64,
}

#[derive(Serialize)]
struct HealthResponse {
    status: &'static str,
    version: &'static str,
}

async fn health() -> Json<HealthResponse> {
    Json(HealthResponse {
        status: "ok",
        version: env!("CARGO_PKG_VERSION"),
    })
}

async fn execute(
    State(_state): State<Arc<AppState>>,
    Json(req): Json<ExecuteRequest>,
) -> Result<Json<ExecuteResponse>, (StatusCode, String)> {
    // Validate manifest first
    if let Err(e) = validate_manifest(&req.manifest) {
        return Err((StatusCode::BAD_REQUEST, e));
    }

    // Decode WASM bytes
    let wasm_bytes = base64::Engine::decode(
        &base64::engine::general_purpose::STANDARD,
        &req.wasm_base64,
    )
    .map_err(|e| (StatusCode::BAD_REQUEST, format!("Invalid base64: {}", e)))?;

    // Execute in sandbox
    match execute_extension(&wasm_bytes, &req.manifest) {
        Ok(result) => Ok(Json(ExecuteResponse {
            success: result.success,
            output: result.output,
            error: result.error,
            cpu_used_ms: result.cpu_used_ms,
            memory_used_bytes: result.memory_used_bytes,
        })),
        Err(e) => Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Sandbox error: {:#}", e),
        )),
    }
}

#[tokio::main]
async fn main() {
    let state = Arc::new(AppState { _placeholder: () });

    let app = Router::new()
        .route("/health", get(health))
        .route("/execute", post(execute))
        .layer(
            tower_http::cors::CorsLayer::permissive()
        )
        .with_state(state);

    let port = std::env::var("SANDBOX_PORT").unwrap_or_else(|_| "3001".to_string());
    let addr = format!("0.0.0.0:{}", port);
    println!("Sandbox sidecar running on http://{}", addr);

    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

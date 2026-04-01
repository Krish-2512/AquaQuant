function formatLog(level, message, meta = {}) {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  });
}

export function logInfo(message, meta = {}) {
  console.log(formatLog("info", message, meta));
}

export function logWarn(message, meta = {}) {
  console.warn(formatLog("warn", message, meta));
}

export function logError(message, error, meta = {}) {
  console.error(
    formatLog("error", message, {
      ...meta,
      errorName: error?.name,
      errorMessage: error?.message || String(error),
      stack: error?.stack,
    })
  );
}

export function buildRequestMeta(request, extra = {}) {
  return {
    path: request.nextUrl?.pathname,
    method: request.method,
    requestId:
      request.headers.get("x-request-id") ||
      request.headers.get("x-correlation-id") ||
      undefined,
    ...extra,
  };
}

$port = 8080
$prefix = "http://localhost:$port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "Serving HTTP on $prefix ..."

$root = (Get-Location).Path

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $path = $request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrEmpty($path)) { $path = "index.html" }
    $localPath = Join-Path $root $path

    if (Test-Path $localPath -PathType Leaf) {
        $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
        $contentType = switch ($ext) {
            ".html" { "text/html; charset=utf-8" }
            ".css"  { "text/css; charset=utf-8" }
            ".js"   { "application/javascript; charset=utf-8" }
            ".jpg"  { "image/jpeg" }
            ".jpeg" { "image/jpeg" }
            ".png"  { "image/png" }
            ".svg"  { "image/svg+xml" }
            Default { "application/octet-stream" }
        }
        $bytes = [System.IO.File]::ReadAllBytes($localPath)
        $response.ContentType = $contentType
        $response.ContentLength64 = $bytes.Length
        $response.StatusCode = 200
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $response.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
        $response.OutputStream.Write($msg, 0, $msg.Length)
    }
    $response.Close()
}

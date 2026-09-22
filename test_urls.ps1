$pages = @(
  'index.html',
  'poultry.html',
  'sonali-kadaknath.html',
  'turkey-guinea-australorp.html',
  'goat-farm.html',
  'goat-breeds.html',
  'fish-farming.html',
  'fruits-vegetables.html',
  'about.html',
  'contact.html'
)

foreach ($p in $pages) {
    $res = Invoke-WebRequest -Uri "http://localhost:8080/$p" -UseBasicParsing
    Write-Host "$p : $($res.StatusCode) - $($res.Content.Length) bytes"
}

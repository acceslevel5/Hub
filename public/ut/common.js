// Useberry-ის დიაგნოსტიკის საერთო ნაწილი: 10 ფერადი ზოლი (300px) და „შემდეგი" ღილაკი ბოლოში
var COLORS = ['#e4572e', '#17bebb', '#ffc914', '#2e282a', '#76b041', '#6a4c93', '#1982c4', '#ff595e', '#8ac926', '#3d405b']
function bands(label, next) {
  var html = '<div style="padding:16px;font:600 18px system-ui;background:#fff">' + label + '</div>'
  for (var i = 0; i < 10; i++) {
    html += '<div style="height:300px;display:flex;align-items:center;justify-content:center;background:' + COLORS[i] + '">' +
      '<span style="font:600 20px system-ui;padding:12px 20px;border-radius:12px;background:#fff">' + (i * 300) + 'px – ' + (i + 1) + '</span></div>'
  }
  html += '<div style="padding:24px;background:#fff;text-align:center">' +
    (next ? '<a href="' + next + '" style="display:inline-block;font:600 20px system-ui;padding:16px 32px;border-radius:12px;background:#ff5c0a;color:#fff;text-decoration:none">შემდეგი →</a>' : '<b style="font:600 20px system-ui">დასასრული</b>') +
    '</div>'
  return html
}

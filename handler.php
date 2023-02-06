<? php
$user_name = htmlspecialchars($_POST["username"]);
$user_phone = htmlspecialchars($_POST["userphone"]);

$token = "6143159372:AAEyQZH_6MCc3o29fd73sZ4U64WkXuV9M2c";
$chat_id = "-840169689";

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&text={$text}&parse_mode=html", "r");

if($sendToTelegram) {
  echo "Success";
} else {
  echo "Error";
}
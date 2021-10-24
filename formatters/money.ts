export function getCentsToMoney(cents: number) {
    return (cents / 100).toFixed(2).replace(".", ",");
}

//https://dribbble.com/shots/16713539-Payment-app-dark-mode/attachments/11756191?mode=media
export default function titleize(text) {
    var loweredText = String(text).toLowerCase();
    var words = loweredText.split(" ");
    for (var a = 0; a < words?.length; a++) {
        var w = words[a];

        var firstLetter = w[0];
        if (firstLetter === "UNDEFINED") { firstLetter = ""; }
        w = String(firstLetter).toUpperCase() + w.slice(1);

        words[a] = w;
    }
    return words.join(" ");
}
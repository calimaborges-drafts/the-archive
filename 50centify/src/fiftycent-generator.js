var fabric = require('fabric-browserify').fabric;
var $ = require('jquery');

module.exports = {
    generate: function(canvasName, topText) {
        var canvas = new fabric.StaticCanvas(canvasName);
        fabric.Image.fromURL('img/50cent.jpg', function (oImg) {
            canvas.setWidth(oImg.getWidth());
            canvas.setHeight(oImg.getHeight());
            canvas.add(oImg);
            var text = new fabric.Text(topText, {
                left: -100,
                top: -100,
                fill: '#fff',
                fontFamily: 'sans-serif',
                fontSize: '42'
            });

            text.set('top', 20);
            text.set('left', 20);

            var siteText = new fabric.Text('50centify.com', {
                left: -100,
                top: -100,
                fill: '#fff',
                fontFamily: 'sans-serif',
                fontSize: '24'
            });

            siteText.set('top', oImg.getHeight() - siteText.getHeight());
            siteText.set('left', oImg.getWidth() - siteText.getWidth() - 5);

            canvas.add(siteText);
            canvas.add(text);

            var img = document.createElement("img");
            img.src = canvas.toDataURL("image/png");
            $('#' + "imagem").attr('src', canvas.toDataURL("image/png"));
            $('#' + "canvasName").hide();
        });
    }
};
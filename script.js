


function hoverEffect(elementId, text) {
    $('#' + elementId).hover(function() {
        var canvas = document.getElementById('listContent');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '1.6rem Arial';
        ctx.fillText(text, 10, 50);
        ctx.fillStyle = 'white';
    }, function() {
        var canvas = document.getElementById('listContent');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
}

hoverEffect('item1', "Unlock Your Business's Full Potential with Custom Web Design! Is your website outdated or underperforming? We specialize in crafting modern, user-friendly websites tailored to your business needs. Whether you’re looking to refresh your online presence or build a site from the ground up, our expert web design services ensure a sleek, responsive, and engaging experience for your visitors.Services include:Custom Website DesignMobile OptimizationE-Commerce SolutionsSEO-Friendly StructureOngoing Maintenance and SupportStand out from the competition and drive more conversions with a professional website that works for you. Contact us today for a free consultation!Let’s bring your vision to life online!");
hoverEffect('item2', "bladfadfadfijoeijfaof");
hoverEffect('item3', "bladfadfadfijoeijfaof");
hoverEffect('item4', "bladfadfadfijoeijfaof");
hoverEffect('item5', "bladfadfadfijoeijfaof");
hoverEffect('item6', "bladfadfadfijoeijfaof");


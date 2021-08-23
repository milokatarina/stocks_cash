<script src="/evapp/public/stocks/stocks/index.js"></script>
<script>
    window.ManageStocks.render(
        document.getElementById('manage-stocks-dashboard'),
        <?= json_encode($yearsRevenue); ?>
    );
</script>
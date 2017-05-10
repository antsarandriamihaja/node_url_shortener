$('.btn-shorten').on('click', function(){
    $.ajax({
        url: '/api/compress',
        type: 'POST',
        dataType: 'JSON',
        data: {url: $('#url-field').val()},
        success: function(data){
            var result = '<a class = "result" href="'+data.shortUrl+'">'+data.shortUrl+'</a>';
            $('#link').html(result);
        }
    });
});

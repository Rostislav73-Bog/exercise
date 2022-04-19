$(document).ready(() => {
$("#btn").on('click', function() {
        let formData = new FormData();
        let file = $("#upload-file")[0].files[0];

        formData.append('file', file);

        $.ajax({
            url: '/file',
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                let file = new Blob([response.data.file], {
                    type: response.data.file.content_type
                })

                let a = document.createElement("a");
                a.innerHTML = 'download'
                a.href = URL.createObjectURL(file)
                console.log(URL.createObjectURL(file))
                a.download = response.data.filename
                $('#downloadFile').append(a)

            },
            error: function(msg) {
                alert('Ошибка!');
            }
        });
});
});

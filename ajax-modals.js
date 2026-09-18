// Ajax-loaded Bootstrap modals (jQuery AJAX requirement)
$(function () {
    toastr.options = {
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-bottom-left',
        timeOut: 4500
    };

    $(document).on('click', '[data-ajax-modal]', function () {
        const url = $(this).data('ajax-modal');

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'html'
        })
        .done(function (html) {
            $('#ajaxModalContainer').html(html);
            const modalElement = $('#ajaxModalContainer').find('.modal')[0];
            if (modalElement) {
                bootstrap.Modal.getOrCreateInstance(modalElement).show();
            }
        })
        .fail(function () {
            toastr.error('تعذر تحميل النافذة حاليًا.');
        });
    });

    $(document).on('submit', '#orderAjaxForm', function (e) {
        e.preventDefault();
        toastr.success('تم استلام طلبك بنجاح، سيتواصل معك فريق الدعم خلال 24 ساعة.');
        const modal = document.getElementById('orderAjaxModal');
        if (modal) bootstrap.Modal.getInstance(modal)?.hide();
        this.reset();
    });

    $(document).on('submit', '#supportAjaxForm', function (e) {
        e.preventDefault();
        toastr.success('تم إرسال طلب التواصل بنجاح.');
        const modal = document.getElementById('supportAjaxModal');
        if (modal) bootstrap.Modal.getInstance(modal)?.hide();
        this.reset();
    });
});

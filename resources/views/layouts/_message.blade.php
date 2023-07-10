@if(session('success'))


<script type="text/javascript">
    $(function() {
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "{{ session('success') }}",
        showConfirmButton: false,
        timer: 1500
    });
    });
  </script>

@endif


@if(session('error'))


<script type="text/javascript">
    $(function() {
      Swal.fire({
        position: "center-center",
        icon: "error",
        title: "{{ session('error') }}",
        showConfirmButton: false,
        timer: 1500
    });
    });
  </script>


@endif

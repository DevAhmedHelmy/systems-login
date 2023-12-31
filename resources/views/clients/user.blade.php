{{--  <div class="card">
    <div class="card-header border-bottom d-flex justify-content-between align-items-center">

        <div>
            <h6>clients List</h6>
        </div>
    </div>
    <div class="card-body">
        <div class="card-datatable">
            <table class="datatables-basic2 table" id="clients">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>Domain</th>

                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>


@push('js')
    <script>
        $(document).ready(function() {
            $('#clients').DataTable({
                processing: true,
                serverSide: true,
                ajax: {
                    url: "{{ route('clients.data') }}",
                    dataType: 'json',
                    type: 'GET'
                },
                columns: [{
                        data: 'name'
                    },
                    {
                        data: 'domain'
                    },
                ],

                displayLength: 15,
                lengthMenu: [15, 25, 50, 100],
            });
        });
    </script>
@endpush  --}}
<div class="card">
    <div class="card-header border-bottom d-flex justify-content-between align-items-center">

        <div>
            <h6>clients List</h6>
        </div>
    </div>
    <div class="card-body">
        <div class="col-md-6 mt-1">
            <label class="form-label" for="select2-basic">Our Clients</label>
            <select class="select2 form-select">
                <option> Select Client</option>
                @foreach ($clients as $client)
                    <option value="{{ $client->id }}">{{ $client->name }}</option>
                @endforeach
            </select>
        </div>
    </div>
</div>

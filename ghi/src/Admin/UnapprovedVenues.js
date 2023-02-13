import Table from 'react-bootstrap/Table';
import { useGetUnapprovedVenuesQuery } from '../store/adminApi';
import { UpdateVenueModal } from './UpdateVenueModal';
import { DeleteVenueModal } from './DeleteVenueModal';

export function UnapprovedVenues() {
    const { data: venuesData, isLoading } = useGetUnapprovedVenuesQuery();

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

    return (
        <>
        <div className='container padding' style={{mt:'5rem'}}>
        <div className='d-flex justify-content-center'>
            <div className='row'>
                <div className='col'>
                    <h3>Venues left to approve: {venuesData.length}.</h3>
                    <Table striped bordered variant='dark'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Venue Name</th>
                                    <th>Street</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Zip</th>
                                    <th>Category #</th>
                                    <th>Description</th>
                                    <th>Added by User #</th>
                                    <th>Prepare for Approval</th>
                                    <th>Delete Venue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {venuesData.map((venue) => {
                                    return (
                                        <tr key={venue.id}>
                                            <td>{venue.id}</td>
                                            <td>{venue.venue_name}</td>
                                            <td>{venue.num_and_street}</td>
                                            <td>{venue.city}</td>
                                            <td>{venue.state}</td>
                                            <td>{venue.zip}</td>
                                            <td>{venue.category_id}</td>
                                            <td>{venue.description_text}</td>
                                            <td>{venue.added_by}</td>
                                            <td>
                                                <UpdateVenueModal venue={venue} />
                                            </td>
                                            <td>
                                                <DeleteVenueModal venue={venue} />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                    </Table>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default UnapprovedVenues;

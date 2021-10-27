import React from 'react';
import './TripSummary.css';

function TripSummary(details: any) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Trip Summary</th>
          </tr>
        </thead>
        <tbody>
          {details.passenger && <tr>
            <td>Passenger</td>
            <td>{details.passenger?.name}</td>
          </tr>}
          {details.itineraryType && <tr>
            <td>Itinerary Type</td>
            <td>{details.itineraryType}</td>
          </tr>}
          {details.departure && <tr>
            <td>Departure</td>
            <td>{details.departure}</td>
          </tr>}
          {details.arrival && <tr>
            <td>Arrival</td>
            <td>{details.arrival}</td>
          </tr>}
          {details.startDate && <tr>
            <td>Start Date</td>
            <td>{details.startDate}</td>
          </tr>}
          {details.endDate && <tr>
            <td>End Date</td>
            <td>{details.endDate}</td>
          </tr>}
        </tbody>
      </table>
    </>
  );
}

export default TripSummary;

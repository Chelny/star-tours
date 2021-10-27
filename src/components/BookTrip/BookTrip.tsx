import React, {useEffect, useState} from 'react';
import { Autocomplete, Loading, TripSummary } from '..';
import ApiService from '../../services/ApiService';
import './BookTrip.css';

function BookTrip() {
  const [passengers, setPassengers] = useState([] as any[]);
  const [planets, setPlanets] = useState([] as any[]);
  const [form, setForm] = useState({
    passenger: null,
    species: null,
    itineraryType: null,
    departure: null,
    arrival: null,
    startDate: null,
    endDate: null,
  });

  /**
   * Scroll to step
   */
  const scrollIntoView = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    ApiService.get('people').then(people => {
      // Filter out people without species
      const peopleWithSpecies = people?.filter((person: any) => person.species.length > 0);
      setPassengers(peopleWithSpecies as []);
    });
  }, []);

  useEffect(() => {
    if (form.passenger !== null) {
      const speciesId = (form.passenger as any).species[0].replace(/^\D+|\//g, '');
      ApiService.get('species', speciesId).then(species => {
        /* eslint-disable react-hooks/exhaustive-deps */
        handleFormChange({ species });
      });

      // Reset Fields
      setForm({ ...form, departure: null });
      setForm({ ...form, arrival: null });
    }
  }, [form.passenger]);

  useEffect(() => {
    if (form.passenger !== null && form.species !== null) {
      ApiService.get('planets').then(planets => {
        const passengerSpeciesPeople = (form.species as any).people;
        let planetsArr: any[] = [];

        planets.forEach((planet: any) => {
          planet.residents.forEach((residentUrl: string) => {
            if (passengerSpeciesPeople.includes(residentUrl)) {
              planetsArr.push(planet);
            }
          });
        });

        setPlanets([...new Set(planetsArr)] as any[]);
      });
    }
  }, [form.passenger, form.species]);

  const handleFormChange = ( field: { [key: string]: any }) => {
    const newFormValue = { ...form, ...field };
    setForm(newFormValue);
    console.log(field)

    if (field.passenger) {
      scrollIntoView('itineraryType');
    } else if (field.itineraryType) {
      scrollIntoView('departure');
    }  else if (field.departure) {
      scrollIntoView('arrival');
    } else if (field.arrival) {
      scrollIntoView('dates');
    } else if ((field.startDate && form.itineraryType === 'oneWay') || field.endDate) {
      scrollIntoView('tripSummary');
    }
  };

  return (
    <>
      <section className="intro" id="passenger">
        <div className="content">
          <div>
            <label htmlFor="passenger">
              Select A Passenger
            </label>
            {passengers.length > 0 && passengers.length > 0 ?
              <select
                id="passenger"
                onChange={(e) => handleFormChange({
                  passenger: JSON.parse(e.target.value)
                })}
              >
                <option>Select...</option>
                {passengers.map((person, key) =>
                  <option key={key} value={JSON.stringify(person)}>
                    {person.name}
                  </option>
                )}
              </select>
              :
              <Loading />
            }
          </div>
        </div>
      </section>

      <section id="itineraryType">
        <div className="content">
          <fieldset>
            <legend>Itinerary Type</legend>
            <label htmlFor="itineraryType_oneWay">
              One-Way Trip
            </label>
            <input
              type="radio"
              id="itineraryType_oneWay"
              name="itineraryType"
              value="oneWay"
              onClick={(e) => handleFormChange({
                itineraryType: (e.target as any).value,
              })}
            />
            &nbsp;&nbsp;&nbsp;
            <label htmlFor="itineraryType_round">
              Round Trip
            </label>
            <input
              type="radio"
              id="itineraryType_round"
              name="itineraryType"
              value="round"
              onClick={(e) => handleFormChange({
                itineraryType: (e.target as any).value,
              })}
            />
          </fieldset>
        </div>
      </section>

      <section id="departure">
        <div className="content">
          <div>
            <label htmlFor="departure">
              Departure
            </label>
            {planets.length > 0 && planets.length > 0 ?
              <Autocomplete
                id="departure"
                data={planets}
                onSelectedItem={(value: string) => handleFormChange({ departure: value })}
              />
              :
              <Loading />
            }
          </div>
        </div>
      </section>

      <section id="arrival">
        <div className="content">
          <div>
            <label htmlFor="arrival">
              Arrival
            </label>
            {planets.length > 0 && planets.length > 0 ?
              <Autocomplete
                id="arrival"
                data={planets}
                onSelectedItem={(value: string) => handleFormChange({ arrival: value })}
              />
              :
              <Loading />
            }
          </div>
        </div>
      </section>

      <section id="dates">
        <div className="content">
          <div>
            <label htmlFor="startDate">
              Start Date
            </label>
            <input
              type="datetime-local"
              id="startDate"
              onBlur={(e) => handleFormChange({ startDate: e.target.value })}
            />
            <br />
            {form.itineraryType === 'round' && <>
              <label htmlFor="endDate">
                End Date
              </label>
              <input
                type="datetime-local"
                id="endDate"
                min={form.startDate!}
                onBlur={(e) => handleFormChange({ endDate: e.target.value })}
              />
            </>}
          </div>
        </div>
      </section>

      <section id="tripSummary">
        <div className="content">
          <TripSummary {...form} />
        </div>
      </section>
    </>
  );
}

export default BookTrip;

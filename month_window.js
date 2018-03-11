import { DateTime, Interval, Duration } from 'luxon';

export default function monthWindow( startDate ) {
    return Interval.fromDateTimes(
        startDate.startOf( 'month' ).startOf( 'week' ),
        startDate.endOf( 'month' ).endOf( 'week' )
    )
    .splitBy( Duration.fromISO( 'P1D' ) )
    .map( ( dayInterval ) => dayInterval.start )
}

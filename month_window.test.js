import monthWindow from './month_window'
import { DateTime } from 'luxon';

describe( 'German locale', () => {

    const zone = { zone: 'Europe/Berlin' };

    test( 'given a month starting on Thursday, start of window is Monday of previous month', () => {
        const startDay = DateTime.fromISO( '2018-03-01', zone );
        const firstDay = monthWindow( startDay )[ 0 ];

        expect( firstDay.weekday ).toBe( 1 );
        expect( firstDay.day ).toBe( 26 );
        expect( firstDay.month ).toBe( 2 );
    } );

    test( 'given a month starting on Monday, start of window is the same Monday', () => {
        const startDay = DateTime.fromISO( '2018-01-01', zone );
        const firstDay = monthWindow( startDay )[ 0 ];

        expect( firstDay.weekday ).toBe( 1 );
        expect( firstDay.day ).toBe( 1 );
        expect( firstDay.month ).toBe( 1 );
    } );


    test( 'given a month ending on Thursday, end of window is Sunday of next month', () => {
        const startDay = DateTime.fromISO( '2018-05-01', zone );
        const [ lastDay ] = monthWindow( startDay ).slice( -1 );

        expect( lastDay.weekday ).toBe( 7 );
        expect( lastDay.day ).toBe( 3 );
        expect( lastDay.month ).toBe( 6 );
    } );

    test( 'given a month ending on Sunday, end of window is Sunday of same month', () => {
        const startDay = DateTime.fromISO( '2018-09-01', zone );
        const [ lastDay ] = monthWindow( startDay ).slice( -1 );

        expect( lastDay.weekday ).toBe( 7 );
        expect( lastDay.day ).toBe( 30 );
        expect( lastDay.month ).toBe( 9 );
    } );

    test( 'Month with 5 weeks', () => {
        const startDay = DateTime.fromISO( '2018-09-01', zone );

        expect( monthWindow( startDay ) ).toHaveLength( 35 );
    } );

    test( 'Month with 6 weeks', () => {
        const startDay = DateTime.fromISO( '2018-07-01', zone );

        expect( monthWindow( startDay ) ).toHaveLength( 42 );
    } );

    test( 'Month with 4 weeks', () => {
        const startDay = DateTime.fromISO( '2010-02-01', zone );

        expect( monthWindow( startDay ) ).toHaveLength( 28 );
    } );

    // TODO test month with DST change - dates should still follow each other

} );

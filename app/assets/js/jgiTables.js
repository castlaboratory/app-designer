'use strict';

/**
 * Identifiers about the tables we'll need to use for the JGI app.
 */

exports.chimpObservation = {
  tableId: 'follow_arrival',
  columns: {
    date: 'FA_FOL_date',
    followStartTime: 'FA_time_start',
    time: 'FA_duration_of_obs',
    focalId: 'FA_FOL_B_focal_AnimID',
    chimpId: 'FA_B_arr_AnimID',
    certainty: 'FA_type_of_certainty',
    withinFive: 'FA_within_five_meters',
    closest: 'FA_closest_to_focal',
    estrus: 'FA_type_of_cycle'
  }
};

exports.species = {
  tableId: 'other_species',
  columns: {
    date: 'OS_FOL_date',
    timeBegin: 'OS_time_begin',
    focalId: 'OS_FOL_B_focal_AnimID'
  }
};

exports.food = {
  tableId: 'food_bout',
  columns: {
    date: 'FB_FOL_date',
    focalId: 'FB_FOL_B_AnimID',
    timeBegin: 'FB_begin_feed_time'
  }
};

exports.follow = {
  tableId: 'follow',
  columns: {
    date: 'FOL_date',
    focalId: 'FOL_B_AnimID',
    communityId: 'FOL_CL_community_id',
    beginTime: 'FOL_time_begin',
    researcher: 'FOL_am_observer1'
  }
};
/**
 * Render the registration detail page
 */

'use strict';

var registrationResultSet = {};
var type = util.getQueryParameter('type');
var locale = odkCommon.getPreferredLocale();
var showDelivered = 'false';

function cbSuccess(result) {
    registrationResultSet = result;
    console.log(registrationResultSet.get('beneficiary_code'));
    var first_name = registrationResultSet.get('first_name');
    var last_name = registrationResultSet.get('last_name');
    $('#title').text(first_name + ' ' + last_name);


    $('#inner_beneficiary_code').text(registrationResultSet.get('beneficiary_code'));
    $('#inner_address').text(registrationResultSet.get('address'));
    $('#inner_id_number').text(registrationResultSet.get('id_number'));
    $('#inner_city').text(registrationResultSet.get('city'));
    $('#inner_telephone').text(registrationResultSet.get('telephone'));
    $('#inner_mobile_provider').text(registrationResultSet.get('mobile_provider'));

    $('#beneficiary_code').prepend(odkCommon.localizeText(locale, 'beneficiary_code') + ": ");
    $('#address').prepend(odkCommon.localizeText(locale, 'address') + ": ");
    $('#id_number').prepend(odkCommon.localizeText(locale, 'id_number') + ": ");
    $('#city').prepend(odkCommon.localizeText(locale, 'city') + ": ");
    $('#telephone').prepend(odkCommon.localizeText(locale, 'telephone') + ": ");
    $('#mobile_provider').prepend(odkCommon.localizeText(locale, 'mobile_provider') + ": ");

    


    if (registrationResultSet.get('is_active') == 'true' && (type == 'delivery' || type == 'registration')) {
        odkData.query('entitlements', 'beneficiary_code = ? and is_delivered = ?',
                      [registrationResultSet.get('beneficiary_code'), 'false'],
                      null, null, null, null, null, null, null, entCBSuccess, entCBFailure);
    }  else if (registrationResultSet.get('is_active') == 'false' && (type == 'delivery' || type == 'registration')) {
        $('#inner_reject').text(odkCommon.localizeText(locale, 'disabled_beneficiary_notification'));
    } else {
        var action = $('#followup');
        if (type == 'activate') {
            action.text(odkCommon.localizeText(locale, "enable_beneficiary"));
        } else {
            action.text(odkCommon.localizeText(locale, "disable_beneficiary"));
        }
        action.show();
        action.on(
                  'click',
                  function() {
                      var struct = {};
                      if (type == 'activate') {
                          struct.is_active = 'true';
                      } else {
                          struct.is_active = 'false';
                      }
                      struct.is_override = 'true';
                      odkData.updateRow('registration', struct, registrationResultSet.getRowId(0),
                                        updateCBSuccess, updateCBFailure);
                  }
                 );
    }
}

function cbFailure(error) {
    console.log('registration_detail cbFailure: getViewData failed with message: ' + error);
}

function updateCBSuccess(result) {
    console.log('Update is_active callback success');
    $("#followup").prop("disabled",true);
    if (type == 'activate') {
        $('#message').text('Successfully Enabled!');
    } else {
        $('#message').text('Successfully Disabled!');
    }
}

function updateCBFailure(result) {
    console.log('Update is_active callback failure');
}

function entCBSuccess(result) {
  console.log(result.getCount());

  $('#entitlements_switch').show();
  $('#entitlements_title').text('Entitlements Listed'); // TODO: localize this

  $('#pending_txt').text('Pending'); // TODO: Localize this
  $('#entitlements_pending').click(updateSubListView);

  $('#delivered_txt').text('Delivered'); // TODO: Localize this
  $('#entitlements_delivered').click(updateSubListView);

  updateSubListView();
}

function updateSubListView() {
    odkTables.setSubListView('entitlements',
                             'beneficiary_code = ? and is_delivered = ?',
                             [registrationResultSet.get('beneficiary_code'), showDelivered],
                             'config/tables/entitlements/html/entitlements_list.html'
                            );

    if (showDelivered === 'true') {
        showDelivered = 'false';
    } else {
        showDelivered = 'true';
    }
}

function entCBFailure(error) {
    console.log('entCBFailure with error: ' + error);
}

function display() {
    // Default to showing undelivered entitlements
    showDelivered = 'false';

    odkData.getViewData(cbSuccess, cbFailure);
}
// noinspection JSDeprecatedSymbols,JSUnusedLocalSymbols

import $ from 'jquery';

export const $changelog = () => {
  $('.support-button').click(function (e) {
    e.preventDefault();
    $('#support-modal').modal('show');
  });
  $('#support-discord-link').click(function (e) {
    $('#support-modal').modal('hide');
  });
};

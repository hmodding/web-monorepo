// noinspection JSDeprecatedSymbols

import { Modal } from 'bootstrap';
import $ from 'jquery';

export const donationModal = () => {
  $.extend(Modal);

  $('.donate-button').click(function (e) {
    e.preventDefault();
    $('#donate-modal').modal('toggle');
  });
};

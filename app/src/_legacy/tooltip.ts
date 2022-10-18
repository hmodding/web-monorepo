import $ from 'jquery';

export const $tooltip = () => {
  $('[data-toggle="tooltip"]').tooltip();
};

import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function() {
    $('select:first-of-type').select2({
      placeholder: 'Weekday'
    });
    $('select:nth-of-type(2)').select2({
      placeholder: 'Type of Work'
    });
  },

  currentDateRange: function() {
    return $('span:contains(Current Timesheet Period:)').parent().next().find('span').text();
  }.property(),

  presetOptions: function() {
    this.selectFirstCol();
    this.iterateOverProjectTypes();
  }.property(),

  availableOptions:  [
    {
      label: 'General',
      options: [
        {
          value: '128,1636,22475,1',
          name: 'Vacation'
        },
        {
          value: '128,1636,22475,1',
          name: 'Sick'
        },
        {
          value: '128,1636,22478,1',
          name: 'Maternity'
        },
        {
          value: '128,1636,22476,1',
          name: 'Jury Duty'
        },
        {
          value: '128,1636,22477,1',
          name: 'Bereavement'
        },
        {
          value: '128,1636,22479,1',
          name: 'Leave Without Pay'
        },
        {
          value: '128,1636,22475,1',
          name: 'Floating Holiday'
        },
        {
          value: '128,1636,22474,1',
          name: 'Company Holiday'
        }
      ]
    },
    {
      label: 'Engineering',
      options: [
        {
          value: '128,2118,30554,1',
          name: 'Sprint development'
        },
        {
          value: '128,2118,30554,1',
          name: 'Feature development'
        },
        {
          value: '128,2118,30554,1',
          name: 'Bug fixes'
        },
        {
          value: '128,2118,30555,1',
          name: 'App support'
        },
        {
          value: '128,2118,30555,1',
          name: 'Hot fixes'
        },
        {
          value: '128,2118,30570,1',
          name: 'Sprint planning'
        },
        {
          value: '128,2118,30553,1',
          name: 'Conclave'
        },
        {
          value: '128,2118,30569,1',
          name: 'Sprint Retrospective'
        },
        {
          value: '128,1588,22258,1',
          name: '1:1\'s'
        }
      ]
    },
    {
      label: 'Design',
      options: [
        {
          value: '',
          name: 'UX - User Experience Design'
        },
        {
          value: '',
          name: 'UI - User Interface Design'
        }
      ]
    }
  ]
});

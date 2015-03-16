import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    addNewActivity: function () {
      var new_activity = Ember.Object.create({
        name: $('select[name=type]').select2('data').text,
        hours: $('input[name=time]').val(),
        day: $('select[name=day]').val(),
        value: $('select[name=type]').select2('data').id
      });

      var activity_group = this.activityGroups.findBy('name', new_activity.get('day'))
      if (activity_group) {
        activity_group.entries.addObject(new_activity);
      } else {
        var new_group = Ember.Object.create({
          name: new_activity.get('day'),
          sort_key: this.sortKeyFor(new_activity.get('day')),
          entries: [new_activity]
        });
        this.activityGroups.addObject(new_group);
      }

      this.clearFormFields();
      this.focusTime();
    }
  },

  activityGroups: Ember.ArrayController.create({
    sort: ['sort_key']
  }),

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

  clearFormFields: function() {
    $('input[name=time], select[name=type], select[name=day]').val(null).trigger('change');
  },

  focusTime: function() {
    $('input[name=time]').focus();
  },

  sortKeyFor: function(day) {
    var key_table = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 7
    };

    return key_table[day];
  },

  // I would love a better way to do this ...
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
          value: '128,2118,30568,1',
          name: 'UX - User Experience Design'
        },
        {
          value: '128,2118,30574,1',
          name: 'UI - User Interface Design'
        },
        {
          value: '128,2118,30575,1',
          name: 'DUI - Developer Support'
        }
      ]
    }
  ]
});

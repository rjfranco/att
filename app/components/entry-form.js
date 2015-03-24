import Ember from 'ember';

export default Ember.Component.extend( Ember.TargetActionSupport, {
  actions: {
    addNewActivity: function () {
      var new_activity = Ember.Object.create({
        name: $('select[name=type]').select2('data').text,
        hours: $('input[name=time]').val(),
        day: $('select[name=day]').val(),
        value: $('select[name=type]').select2('data').id,
        id: this.generateEntryID()
      });

      this.addActivity(new_activity);

      this.clearFormFields();
      this.focusTime();
    },

    removeEntry: function(group, entry) {
      group.get('entries').removeObject(entry);

      // Remove the group if it's the last entry
      if(!group.get('entries.length')) {
        this.activityGroups.removeObject(group);
      }
    },

    submitNewTimesheet: function() {
      this.saveTimesheet();
    },

    restoreOlderTimesheet: function(timesheet) {
      timesheet.entries.forEach( function(entry) {
        var new_activity = Ember.Object.create(entry);

        this.addActivity(new_activity);
      }.bind(this));
    },

    goToPreviousWeek: function() {
      $('#C_C_H1_C_W_ImageButton1').trigger('click');
    },

    goToNextWeek: function() {
      $('#C_C_H1_C_W_ImageButton2').trigger('click');
    }
  },

  activityGroups: Ember.ArrayController.create({
    sort: ['sort_key']
  }),

  willInsertElement: function() {
    this.defaultToWeekPrior();
    this.restorePreviousTimesheets();
  },

  didInsertElement: function() {
    this.applySelect2();
  },

  defaultToWeekPrior: function() {
    var start_date_param = /StartDate\=/i;
    if (!start_date_param.test(window.location.href)) {
      this.triggerAction({
        action: 'goToPreviousWeek',
        target: this
      });
    }
  },

  restorePreviousTimesheets: function() {
    var timesheet_string = localStorage.getItem('timesheets');

    if (timesheet_string) {
      this.set('timesheets', JSON.parse(timesheet_string));
    } else {
      this.set('timesheets', []);
    }
  },

  applySelect2: function() {
    $('select:first-of-type').select2({
      placeholder: 'Weekday'
    });

    $('select:nth-of-type(2)').select2({
      placeholder: 'Type of Work'
    });
  },

  saveTimesheet: function() {
    if (this.get('timesheets').length > 7) {
      this.get('timesheets').splice(0,1);
    }

    var weekly_entries = this.activityGroups.toJSON().mapBy('entries');
    var entries = [];
    entries = entries.concat.apply(entries, weekly_entries);

    var new_timesheet = {
      name: this.get('currentDateRange'),
      entries: entries
    };

    this.timesheets.addObject(new_timesheet);

    var timesheets_string = JSON.stringify(this.timesheets);

    localStorage.setItem('timesheets', timesheets_string);

    $('.submit-timesheet').trigger('blur');
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

  addActivity: function(new_activity) {
    var activity_group = this.activityGroups.findBy('name', new_activity.get('day'));

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
  },

  previousTimesheets: function() {
    return this.get('timesheets');
  }.property('timesheets'),

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

  generateEntryID: function() {
    var text = '';
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  },

  canSubmit: function() {
    return this.get('activityGroups.length') && !this.get('submitted');
  }.property('activityGroups.length'),

  submitted: function() {
    return $('#C_C_H1_C_W_lblTimesheetStatus').text() !== 'Not Submitted';
  }.property(),

  hasActions: function() {
    return this.get('canSubmit') || this.get('previousTimesheets');
  }.property('canSubmit,previousTimesheets'),

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

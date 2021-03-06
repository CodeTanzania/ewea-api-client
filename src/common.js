import clone from 'lodash/clone';
import forEach from 'lodash/forEach';
import merge from 'lodash/merge';
import upperFirst from 'lodash/upperFirst';

import { mergeObjects } from '@lykmapipo/common';

import {
  get,
  createHttpActionsFor,
  createGetHttpActionForReport,
} from './client';

/**
 * @name DEFAULT_FILTER
 * @description default resource filtering options
 * @type {Object}
 * @since 0.7.0
 * @version 0.1.0
 * @static
 * @public
 */
export const DEFAULT_FILTER = { deletedAt: { $eq: null } };

/**
 * @name DEFAULT_PAGINATION
 * @description default resource pagination options
 * @type {Object}
 * @since 0.7.0
 * @version 0.1.0
 * @static
 * @public
 */
export const DEFAULT_PAGINATION = { limit: 10, skip: 0, page: 1 };

/**
 * @name DEFAULT_SORT
 * @description default resource sorting order options
 * @type {Object}
 * @since 0.7.0
 * @version 0.1.0
 * @private
 */
export const DEFAULT_SORT = { updatedAt: -1 };

/**
 * @constant
 * @name WELL_KNOWN
 * @description set of well known api endpoints. they must be one-to-one to
 * naked api endpoints exposed by the server and they must presented in
 * camelcase.
 * @type {String[]}
 * @since 0.7.0
 * @version 0.1.0
 * @static
 * @public
 */
export const WELL_KNOWN = [
  'assessment',
  'campaign',
  'changelog',
  'dispatch',
  'event',
  'indicator',
  'message',
  'party',
  'permission',
  'predefine',
  'question',
  'questionnaire',
  'case',
];

/**
 * @constant
 * @name WELL_KNOWN_REPORTS
 * @description set of well known api endpoints for reports. they must be
 *  one-to-one to naked api endpoints exposed by the server and they must
 * presented in camel-case.
 * @type {String[]}
 * @since 0.13.0
 * @version 0.1.0
 * @static
 * @public
 */
export const WELL_KNOWN_REPORTS = [
  'overview',
  'indicator',
  'risk',
  'action',
  'need',
  'effect',
  'resource',
  'party',
  'alert',
  'event',
  'dispatch',
  'case',
];

// default request params
const DEFAULT_PARAMS = {
  filter: DEFAULT_FILTER,
  paginate: DEFAULT_PAGINATION,
  sort: DEFAULT_SORT,
};

// parties shortcuts
const PARTY_SHORTCUTS = {
  focalPerson: {
    shortcut: 'focalPerson',
    wellknown: 'party',
    params: mergeObjects(DEFAULT_PARAMS, {
      filter: { type: 'Focal' },
    }),
  },
  agency: {
    shortcut: 'agency',
    wellknown: 'party',
    params: mergeObjects(DEFAULT_PARAMS, {
      filter: { type: 'Agency' },
    }),
  },
};

// predefine shortcuts
const PREDEFINE_SHORTCUTS = {
  administrativeLevel: {
    shortcut: 'administrativeLevel',
    wellknown: 'predefine',
    bucket: 'administrativelevels',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  administrativeArea: {
    shortcut: 'administrativeArea',
    wellknown: 'predefine',
    bucket: 'administrativeareas',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  eventLevel: {
    shortcut: 'eventLevel',
    wellknown: 'predefine',
    bucket: 'eventlevels',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  eventSeverity: {
    shortcut: 'eventSeverity',
    wellknown: 'predefine',
    bucket: 'eventseverities',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  eventCertainty: {
    shortcut: 'eventCertainty',
    wellknown: 'predefine',
    bucket: 'eventcertainties',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  eventStatus: {
    shortcut: 'eventStatus',
    wellknown: 'predefine',
    bucket: 'eventstatuses',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  eventUrgency: {
    shortcut: 'eventUrgency',
    wellknown: 'predefine',
    bucket: 'eventurgencies',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  eventResponse: {
    shortcut: 'eventResponse',
    wellknown: 'predefine',
    bucket: 'eventresponses',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  eventAction: {
    shortcut: 'eventAction',
    wellknown: 'predefine',
    bucket: 'eventactions',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  eventFunction: {
    shortcut: 'eventFunction',
    wellknown: 'predefine',
    bucket: 'eventfunctions',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  eventGroup: {
    shortcut: 'eventGroup',
    wellknown: 'predefine',
    bucket: 'eventgroups',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  eventIndicator: {
    shortcut: 'eventIndicator',
    wellknown: 'predefine',
    bucket: 'eventindicators',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  eventQuestion: {
    shortcut: 'eventQuestion',
    wellknown: 'predefine',
    bucket: 'eventquestions',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  eventTopic: {
    shortcut: 'eventTopic',
    wellknown: 'predefine',
    bucket: 'eventtopics',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  eventType: {
    shortcut: 'eventType',
    wellknown: 'predefine',
    bucket: 'eventtypes',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  eventActionCatalogue: {
    shortcut: 'eventActionCatalogue',
    wellknown: 'predefine',
    bucket: 'eventactioncatalogues',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  featureType: {
    shortcut: 'featureType',
    wellknown: 'predefine',
    bucket: 'featuretypes',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  feature: {
    shortcut: 'feature',
    wellknown: 'predefine',
    bucket: 'features',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  notificationTemplate: {
    shortcut: 'notificationTemplate',
    wellknown: 'predefine',
    bucket: 'notificationtemplates',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  partyGender: {
    shortcut: 'partyGender',
    wellknown: 'predefine',
    bucket: 'partygenders',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  partyOccupation: {
    shortcut: 'partyOccupation',
    wellknown: 'predefine',
    bucket: 'partyoccupations',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  partyNationality: {
    shortcut: 'partyNationality',
    wellknown: 'predefine',
    bucket: 'partynationalities',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  partyGroup: {
    shortcut: 'partyGroup',
    wellknown: 'predefine',
    bucket: 'partygroups',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  partyOwnership: {
    shortcut: 'partyOwnership',
    wellknown: 'predefine',
    bucket: 'partyownerships',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  partyRole: {
    shortcut: 'partyRole',
    wellknown: 'predefine',
    bucket: 'partyroles',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  priorities: {
    shortcut: 'priority',
    wellknown: 'predefine',
    bucket: 'priorities',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  unit: {
    shortcut: 'unit',
    wellknown: 'predefine',
    bucket: 'units',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  vehicle: {
    shortcut: 'vehicle',
    wellknown: 'predefine',
    bucket: 'vehicles',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  vehicleModel: {
    shortcut: 'vehicleModel',
    wellknown: 'predefine',
    bucket: 'vehiclemodels',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  vehicleMake: {
    shortcut: 'vehicleMake',
    wellknown: 'predefine',
    bucket: 'vehiclemakes',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  vehicleStatus: {
    shortcut: 'vehicleStatus',
    wellknown: 'predefine',
    bucket: 'vehiclestatuses',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  vehicleType: {
    shortcut: 'vehicleType',
    wellknown: 'predefine',
    bucket: 'vehicletypes',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  caseSeverity: {
    shortcut: 'caseSeverity',
    wellknown: 'predefine',
    bucket: 'caseseverities',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  caseStage: {
    shortcut: 'caseStage',
    wellknown: 'predefine',
    bucket: 'casestages',
    params: mergeObjects(DEFAULT_PARAMS),
  },
};

/**
 * @constant
 * @name SHORTCUTS
 * @description set of applicable api shortcuts.
 * @type {Object}
 * @since 0.7.0
 * @version 0.1.0
 * @static
 * @public
 */
export const SHORTCUTS = mergeObjects(
  // FEATURE_SHORTCUTS,
  PARTY_SHORTCUTS,
  PREDEFINE_SHORTCUTS
);

/**
 * @constant
 * @name RESOURCES
 * @description set of applicable api endpoints including both well-known and
 * shortcuts. they must presented in camel-case and wellknown key should point
 * back to {@link WELL_KNOWN}.
 * @type {Object}
 * @since 0.7.0
 * @version 0.1.0
 * @static
 * @public
 */
export const RESOURCES = mergeObjects(SHORTCUTS);

// build wellknown resources
forEach([...WELL_KNOWN], (wellknown) => {
  const name = clone(wellknown);
  const shortcut = clone(wellknown);
  const params = mergeObjects(DEFAULT_PARAMS);
  const resource = { shortcut, wellknown, params };
  RESOURCES[name] = resource;
});

/**
 * @name httpActions
 * @description resource http actions
 * @type {Object}
 * @since 0.7.0
 * @version 0.1.0
 * @static
 * @public
 */
export const httpActions = {
  getSchemas: () =>
    get('/schemas').then((response) => {
      const schemas = { ...response };
      // expose shortcuts schema
      if (schemas) {
        forEach(SHORTCUTS, (shortcut) => {
          const key = upperFirst(shortcut.shortcut);
          const wellknown = upperFirst(shortcut.wellknown);
          schemas[key] = schemas[wellknown];
        });
      }
      return schemas;
    }),
};

// build resource http actions
forEach(RESOURCES, (resource) => {
  const resourceHttpActions = createHttpActionsFor(resource);
  merge(httpActions, resourceHttpActions);
});

// build report http Get Actions
forEach(WELL_KNOWN_REPORTS, (report) => {
  const reportHttpAction = createGetHttpActionForReport(report);
  merge(httpActions, reportHttpAction);
});

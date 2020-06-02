import { forEach, keys } from 'lodash';
import { expect } from 'chai';
import {
  DEFAULT_FILTER,
  DEFAULT_PAGINATION,
  DEFAULT_SORT,
  WELL_KNOWN,
  WELL_KNOWN_REPORTS,
  RESOURCES,
  SHORTCUTS,
} from '../src/index';

describe('ewea api client', () => {
  it('should expose default api endpoint filter options', () => {
    expect(DEFAULT_FILTER).to.exist;
    expect(DEFAULT_FILTER).to.be.an('object');
    expect(DEFAULT_FILTER).to.be.eql({ deletedAt: { $eq: null } });
  });

  it('should expose default api endpoint pagination options', () => {
    expect(DEFAULT_PAGINATION).to.exist;
    expect(DEFAULT_PAGINATION).to.be.an('object');
    expect(DEFAULT_PAGINATION).to.be.eql({ limit: 10, skip: 0, page: 1 });
  });

  it('should expose default api endpoint sort order options', () => {
    expect(DEFAULT_SORT).to.exist;
    expect(DEFAULT_SORT).to.be.an('object');
    expect(DEFAULT_SORT).to.be.eql({ updatedAt: -1 });
  });

  it('should expose names of well known api endpoints', () => {
    expect(WELL_KNOWN).to.exist;
    expect(WELL_KNOWN).to.be.an('array');
    expect(WELL_KNOWN).to.be.eql([
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
    ]);
  });

  it('should expose names of well known reports api endpoints', () => {
    expect(WELL_KNOWN_REPORTS).to.exist;
    expect(WELL_KNOWN_REPORTS).to.be.an('array');
    expect(WELL_KNOWN_REPORTS).to.be.eql([
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
    ]);
  });

  it('should expose wellknown resource builder options', () => {
    expect(RESOURCES).to.exist;
    expect(RESOURCES).to.be.an('object');
    forEach(WELL_KNOWN, (wellknown) => {
      expect(RESOURCES).to.have.property(wellknown);
    });
  });

  it('should expose shortcuts resource builder options', () => {
    expect(SHORTCUTS).to.exist;
    expect(SHORTCUTS).to.be.an('object');
    expect(keys(SHORTCUTS)).to.contain('focalPerson', 'agency');
    forEach(keys(SHORTCUTS), (shortcut) => {
      expect(RESOURCES).to.have.property(shortcut);
    });
  });
});

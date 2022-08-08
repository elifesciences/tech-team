export const types = {
  prefix: 'type',
  labels: [
    {
      name: 'bug',
      description: 'Something that is not working or working incorrectly',
      color: 'd73a4a',
      match: [':label:  bug']
    },
    {
      name: 'critical',
      description: 'A serious issue that is causing downtime or degraded performance',
      color: 'd73a4a',
      match: []
    },
    {
      name: 'security',
      description: 'A potential security vulnerability',
      color: 'd73a4a',
      match: []
    },
    {
      name: 'feature',
      description: 'A major feature or improvement',
      color: '3e4b9e',
      match: ['feature-request', 'Epic']
    },
    {
      name: 'enhancement',
      description: 'A minor improvement or tweak',
      color: '3e4b9e',
      match: []
    },
    {
      name: 'task',
      description: 'An incremental step towards completing a larger goal',
      color: '3e4b9e',
      match: []
    },
    {
      name: 'spike',
      description: 'A time-boxed investigation to learn more about a problem or solution',
      color: '3e4b9e',
      match: []
    },
    {
      name: 'chore',
      description: 'A trivial or repetative task that requires time but little knowledege',
      color: 'BFBFA3',
      match: []
    },
    {
      name: 'documentation',
      description: 'Improvements or additions to documentation',
      color: 'BFBFA3',
      match: ['docs']
    }
  ]
};

export const skills = {
  prefix: 'skill',
  labels: [
    {
      name: 'html',
      description: 'Solution requires expertise in HTML',
      color: '9448dc',
      match: ['HTML']
    },
    {
      name: 'css',
      description: 'Solution requires expertise in CSS',
      color: '9448dc',
      match: ['CSS']
    },
    {
      name: 'javascript',
      description: 'Solution requires expertise in JavaScript',
      color: '9448dc',
      match: ['js']
    },
    {
      name: 'typescript',
      description: 'Solution requires expertise in TypeScript',
      color: '9448dc',
      match: ['ts']
    },
    {
      name: 'python',
      description: 'Solution requires expertise in Python',
      color: '9448dc',
      match: ['py']
    },
    {
      name: 'php',
      description: 'Solution requires expertise in PHP',
      color: '9448dc',
      match: ['PHP']
    },
    {
      name: 'docker',
      description: 'Solution requires expertise in Docker',
      color: '9448dc',
      match: []
    },
    {
      name: 'jenkins',
      description: 'Solution requires expertise in Jenkins',
      color: '9448dc',
      match: []
    },
    {
      name: 'aws',
      description: 'Solution requires expertise in Amazon Web Services',
      color: '9448dc',
      match: []
    },
    {
      name: 'kubernetes',
      description: 'Solution requires expertise in Kubernetes',
      color: '9448dc',
      match: []
    },
    {
      name: 'salt',
      description: 'Solution requires expertise in SaltStack',
      color: '9448dc',
      match: []
    },
  ]
};

export const status = {
  prefix: 'status',
  labels: [
    {
      name: 'blocked',
      description: 'Progress on this issue currently impeeded',
      color: '000000',
      match: ['blocked']
    },
    {
      name: 'upstream',
      description: 'Progress on this issue currently impeeded due to an upstream dependency',
      color: '000000',
      match: []
    },
    {
      name: 'discussion',
      description: 'Currently under debate in order to reach a decision or to exchange ideas',
      color: 'd876e3',
      match: []
    },
    {
      name: 'question',
      description: 'Further information is requested or required',
      color: 'd876e3',
      match: []
    },
    {
      name: 'discovery',
      description: 'Requires further investigation before being ready to work',
      color: 'fbca04',
      match: []
    },
    {
      name: 'ready to work',
      description: 'Issue is well defined, fully scoped and is ready to be worked on',
      color: '0e8a16',
      match: []
    },
    {
      name: 'unplanned',
      description: 'Not originally planned for the current sprint, but needs to be addressed',
      color: 'fbca04',
      match: []
    },
    {
      name: 'backlog',
      description: 'Work pulled into the current sprint from the backlog',
      color: '1d76db',
      match: []
    },
  ]
};

export const stakeholders = {
  prefix: 'stakeholder',
  labels: [
    {
      name: 'technology',
      description: 'Requested or required by the Technology team',
      color: 'f48f13',
      match: ['engineering', 'tech']
    },
    {
      name: 'editorial',
      description: 'Requested or required by the Editorial team',
      color: 'f48f13',
      match: []
    },
    {
      name: 'production',
      description: 'Requested or required by the Production team',
      color: 'f48f13',
      match: []
    },
    {
      name: 'marketing',
      description: 'Requested or required by the Marketing team',
      color: 'f48f13',
      match: []
    },
    {
      name: 'finance',
      description: 'Requested or required by the Finance team',
      color: 'f48f13',
      match: []
    },
    {
      name: 'product',
      description: 'Requested or required by the Product team',
      color: 'f48f13',
      match: []
    },
  ]
};

export const goals = {
  prefix: 'goal',
  labels: [
    {
      name: 'maintenance',
      description: 'Ensure the current state and functionality is preserved',
      color: '76D7C4',
      match: []
    },
    {
      name: 'submissions',
      description: 'Attract between 2500 and 3500 submissions per quarter',
      color: '76D7C4',
      match: []
    },
  ]
}
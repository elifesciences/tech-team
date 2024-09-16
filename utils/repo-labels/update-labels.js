// Quick and dirty program to update labels in GitHub repos...
// TODO:
// - Tidy the code up, convert to TypeScript.
// - Catch errors.
// - Document.
// - Add usage.
// - Update README.
// - Add to CI.

import { Octokit } from "@octokit/core";
import { types, skills, status, stakeholders, goals } from './labels.js';

const octokit = new Octokit({ auth: `INSERT TOKEN HERE`});

const all = [...types.labels, ...skills.labels, ...status.labels, ...stakeholders.labels, ...goals.labels];

const targets = [
  {
    name: 'elifesciences',
    repositories: [
      'issues',
      'sciencebeam-issues',
      'data-hub-issues'
    ]
  }
]

// Pauses for the desired amount of time.
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Gets all the labels for the specified repository.
async function getLabelsForRepository(owner, repo) {
  let data = [];
  let page = 0;
  let response;
  const pageSize = 100;
  do
  {
    response = await octokit.request('GET /repos/{owner}/{repo}/labels', {
      owner,
      repo,
      page: ++page,
      per_page: pageSize
    });

    data.push(...response.data);
  } while (response.status === 200 && response.data.length > 0);
  return data;
}

function getMatch(match, labels) {
  let retVal = undefined;
  for (let label of labels) {
    if (label.name === match.name || match.match.includes(label.name)) {
      return label;
    }
  }
  return retVal;
}

// Compares 2 labels to see if they exactly match
function compareLabel(a, b) {
  return (a.name === b.name && a.description === b.description && a.color === b.color);
}

// Creates a new Create Label Job
function createNewLabelJob(owner, repo, label) {
    return {
      owner,
      repo,
      name: label.name,
      description: label.description,
      color: label.color
    }
}

// Creates a new label
async function createLabel(job) {
  const response = await octokit.request('POST /repos/{owner}/{repo}/labels', job);
  if (response.status !== 201) {
    console.error(`Failed to create label '${job.name}' in '${job.owner}/${job.repo}'`);
  }
  else {
    console.info(`Created label '${job.name}' in '${job.owner}/${job.repo}'`);
  }
}

// Creates a new Update Label Job
function createUpdateJob(owner, repo, name, label) {
  return {
    owner,
    repo,
    name,
    new_name: label.name,
    description: label.description,
    color: label.color
  }
}

// Updates the specified label
async function updateLabel(job) {
  const response = await octokit.request('PATCH /repos/{owner}/{repo}/labels/{name}', job);
  if (response.status !== 200) {
    console.error(`Failed to update label '${job.name}' in '${job.owner}/${job.repo}'`);
  }
  else {
    console.info(`Updated label '${job.name}' in '${job.owner}/${job.repo}'`);
  }
}

let createJobs = [];
let updateJobs = [];
for (let org of targets) {
  for (let repo of org.repositories) {
    console.log(`INFO: Checking labels for '${org.name}/${repo}'`);

    const labels = await getLabelsForRepository(org.name, repo);

    console.log(`INFO: Found '${labels.length}' labels in '${org.name}/${repo}'`);

    // For each label we want in the repository.
    for (const label of all) {

      // See if there is already an existing label in the repo that fuzzy matches.
      const match = getMatch(label, labels);
      if (match === undefined)
      {
        // Nope, then create it...
        createJobs.push(createNewLabelJob(org.name, repo, label));
      }
      else
      {
        // Check if it is an exact match.
        if (!compareLabel(label, match)) {
          // Nope, then needs updating.
          updateJobs.push(createUpdateJob(org.name, repo, match.name, label));
        }
      }
    }
  }
}

// TODO: Document usage
let test = false;
for (const arg of process.argv) {
  if (arg === '-d' || arg === '--dry-run') {
    test = true;
  }
}

if (test) {
  console.info(`Just a dry run, dumping jobs...`);
  createJobs.map(job => console.info(` CREATE label '${job.name}' in '${job.owner}/${job.repo}'`));
  updateJobs.map(job => console.info(` UPDATE label '${job.new_name}' in '${job.owner}/${job.repo}'`))
}
else {
  createJobs.map(job => createLabel(job));
  updateJobs.map(job => updateLabel(job));
}
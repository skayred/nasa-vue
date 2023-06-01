import { gql } from "graphql-tag";

export const JOB_STATUS = gql`
  query isJobComplete($jobID: String!) {
    isJobComplete(jobId: $jobID)
  }
`;

export const ASTEROIDS = gql`
  query closestAsteroids($from: String!, $to: String!, $amount: Int!) {
    closestAsteroids(from: $from, to: $to, amount: $amount) {
      jobId
      events {
        id
        missDistance
        happenedAt
        asteroid {
          id
          nasaId
          name
        }
      }
    }
  }
`;

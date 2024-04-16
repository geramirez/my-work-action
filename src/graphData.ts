import { QueryGroup, QueryType } from "./shared.types";
import { createObjectCsvStringifier as createCsvStringifier } from 'csv-writer';

const csvStringifier = createCsvStringifier({
    header: [
        { id: 'actor', title: 'actor' },
        { id: 'target', title: 'target' },
        { id: 'url', title: 'url' },
        { id: 'created_at', title: 'created_at' },
        { id: 'title', title: 'title' },
    ]
})

export default function handleGraphData(username: string, queryGroups: QueryGroup[][]): string {
    return csvStringifier.getHeaderString() +
        queryGroups.flat().reduce((csv: string, queryGroup: QueryGroup) => csv + buildRows(username, queryGroup), "")
}

function buildRows(username: string, queryGroup: QueryGroup): string {

    if (queryGroup.data.length === 0)
        return ""

    switch (queryGroup.type) {
        case QueryType['commit']:
            return new PullRequests(username, queryGroup).getEdgeRows()
        case QueryType['discussion-created']:
            return new DiscussionCreated(username, queryGroup).getEdgeRows()
        case QueryType['discussion-comment-created']:
            return new Discussions(username, queryGroup).getEdgeRows()
        case QueryType['issue-created']:
            return new IssueCreated(username, queryGroup).getEdgeRows()
        case QueryType['issue-comment-created']:
            return new Issues(username, queryGroup).getEdgeRows()
        case QueryType['pr-created']:
            return new PullRequests(username, queryGroup).getEdgeRows()
        case QueryType['pr-comment-created']:
            return new PullRequests(username, queryGroup).getEdgeRows()
        case QueryType['pr-commit']:
            return new PullRequests(username, queryGroup).getEdgeRows()
        default:
            return new Other(username, queryGroup).getEdgeRows();
    }
}

class EdgeBuilder {

    queryGroup: QueryGroup;
    csvStringifier: any;
    username: string;

    constructor(username: string, queryGroup: QueryGroup) {
        this.username = username
        this.queryGroup = queryGroup
        this.csvStringifier = csvStringifier;
    }

    getEdgeRows(): string {
        return ""
    }
}

class Discussions extends EdgeBuilder {
    getEdgeRows(): string {
        return this.csvStringifier.stringifyRecords(this.queryGroup.data.map((item) => ({
            actor: item.author.login,
            target: item.discussion.url,
            url: item.url,
            created_at: item.createdAt,
            title: item.discussion.title,
        })))
    }
}


class DiscussionCreated extends EdgeBuilder {
    getEdgeRows(): string {
        return this.csvStringifier.stringifyRecords(this.queryGroup.data.map((item) => ({
            actor: this.username,
            target: item.url,
            url: item.url,
            created_at: item.createdAt,
            title: item.title,
        })))
    }
}


class IssueCreated extends EdgeBuilder {
    getEdgeRows(): string {
        return this.csvStringifier.stringifyRecords(this.queryGroup.data.map((item) => ({
            actor: this.username,
            target: item.url,
            url: item.url,
            created_at: item.createdAt,
            title: item.title,
        })))
    }
}


class Issues extends EdgeBuilder {

    getEdgeRows(): string {
        return this.csvStringifier.stringifyRecords(this.queryGroup.data.map((item) => ({
            actor: item.author.login,
            target: item.issue.url,
            url: item.url,
            created_at: item.createdAt,
            title: item.issue.title,
        })))
    }
}

class PullRequests extends EdgeBuilder {
    getEdgeRows(): string {
        return this.csvStringifier.stringifyRecords(this.queryGroup.data.map((item) => ({
            actor: this.username,
            target: item.url,
            url: item.url,
            created_at: item.createdAt,
            title: item.title,
        })))
    }
}


class Other extends EdgeBuilder {
    getEdgeRows(): string {
        return this.csvStringifier.stringifyRecords(this.queryGroup.data.map((item) => ({
            actor: this.username,
            target: item.url,
            url: item.url,
            created_at: item.createdAt,
            title: item.title,
        })))
    }
}
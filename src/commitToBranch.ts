import { graphql } from "@octokit/graphql";
import { Octokit } from "@octokit/rest";
import { base64encode } from "./shared";
import { InputFields } from "./shared.types";

const commitMutation = `\
mutation myCreateCommitOnBranch($input: CreateCommitOnBranchInput!) {
    createCommitOnBranch(input: $input) {
        ref {
            id
        }
    }
}
`

const commitToBranch = async ({ owner, repo, fetch_graph_data }: InputFields, username: string, branchNodeId: string, branchSha: string, documentBody: string, rawData: string): Promise<{ ref: { id: string } }> => {
    const today = (new Date()).toISOString().replace(/T.*$/, "");
    const commitMessage = 'Generated commit from my-work-action';
    const requestOwner = repo.includes('/') ? repo.split('/')[0] : owner;

    const additions = [{
        path: `my-work/${username}/${today}.md`,
        contents: base64encode(documentBody),
    },
    ]

    if (fetch_graph_data) {
        let fileContent = ""
        const octokit = new Octokit({ auth: `${process.env.GH_TOKEN}` });
        const path = `my-work/${username}/raw_data.csv`
        try {
            const response : any = await octokit.repos.getContent({ owner, repo, path });
            fileContent = Buffer.from(response.data.content, 'base64').toString() + rawData.substring(rawData.indexOf('\n') + 1);
        } catch {
            fileContent = rawData
        }

        additions.push({
            path: path,
            contents: Buffer.from(fileContent).toString('base64'),
        })
    }

    const changeData = {
        owner: requestOwner,
        repo,
        input: {
            branch: {
                id: branchNodeId,
            },
            expectedHeadOid: branchSha,
            fileChanges: {
                additions,
            },
            message: {
                headline: commitMessage,
            },
        },
        headers: {
            authorization: `token ${process.env.GH_TOKEN}`
        },
    };
    return graphql(
        commitMutation,
        changeData,
    );
}



export default commitToBranch;

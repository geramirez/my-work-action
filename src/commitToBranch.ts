import { graphql } from "@octokit/graphql";
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
        additions.push({
            path: `my-work/${username}/raw_data.txt`,
            contents: base64encode(rawData),
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
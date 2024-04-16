import * as fixtureData from '../fixtures/getAllWorkResponse.fixture.json';

const mockGraphQlFunction = jest.fn();
jest.mock('@octokit/graphql', () => ({
    graphql: mockGraphQlFunction
}));

import { getAllWorkForRepository } from './queries';
import handleGraphData from './graphData';


describe('other', () => {
    beforeAll(async () => {
        mockGraphQlFunction.mockResolvedValue(fixtureData);
    });

    test('discussionsCreated', async () => {
        const data = await getAllWorkForRepository('github', 'accessibility', 'inkblotty', '2021-12-01');
        const csv = await handleGraphData("testuser", [[data.discussionsCreated]])
        const expectedOutput = `actor,target,url,created_at,title
        testuser,https://github.com/github/issues/discussions/9152,https://github.com/github/issues/discussions/9152,2024-01-09T20:02:29Z,Introducingtheaccessibility-alt-text-bot
        testuser,https://github.com/github/issues/discussions/9435,https://github.com/github/issues/discussions/9435,2024-02-02T16:59:17Z,NavigationShortcutsinIssuesReact-Recommendation
        testuser,https://github.com/github/issues/discussions/9192,https://github.com/github/issues/discussions/9192,2024-01-12T14:28:14Z,IssuesReact-GAReadinessKickoff🚀
        `.replace(/[ \t\r]+/g, '');
        expect(csv.replace(/[ \t\r]+/g, '')).toEqual(expectedOutput);
    })

    test('discussionComments', async () => {
        const data = await getAllWorkForRepository('github', 'accessibility', 'inkblotty', '2021-12-01');
        const csv = await handleGraphData("testuser", [[data.discussionComments]])
        const expectedOutput = `actor,target,url,created_at,title
        inkblotty,https://github.com/github/issues/discussions/9192,https://github.com/github/issues/discussions/9192#discussioncomment-8202603,2024-01-22T00:03:51Z,IssuesReact-GAReadinessKickoff🚀
        `.replace(/[ \t\r]+/g, '');
        expect(csv.replace(/[ \t\r]+/g, '')).toEqual(expectedOutput);
    })

    test('issuesCreated', async () => {
        const data = await getAllWorkForRepository('github', 'accessibility', 'inkblotty', '2021-12-01');
        const csv = await handleGraphData("testuser", [[data.issuesCreated]])
        const expectedOutput = `actor,target,url,created_at,title
        testuser,https://github.com/github/accessibility/issues/833,https://github.com/github/accessibility/issues/833,2022-04-06T01:53:21Z,[Story][CommandPalette]ReworkTabcompletionandClearbuttonnavigationbasedon#834
        testuser,https://github.com/github/accessibility/issues/832,https://github.com/github/accessibility/issues/832,2022-04-06T01:53:21Z,[EPIC][CommandPalette]ScreenReaderRemediation:Round1
        testuser,https://github.com/github/accessibility/issues/830,https://github.com/github/accessibility/issues/830,2022-04-06T01:53:21Z,[Batch][Dialog]DeveloperExperiencebeforeUpstreaming
        testuser,https://github.com/github/accessibility/issues/829,https://github.com/github/accessibility/issues/829,2022-04-06T01:53:21Z,[Story][Dialog]DocumentationforDevelopersonusage
        testuser,https://github.com/github/accessibility/issues/828,https://github.com/github/accessibility/issues/828,2022-04-06T01:53:21Z,[Story][Dialog]LintingrulestohelpguideDeveloperstousethenewDialog
        testuser,https://github.com/github/accessibility/issues/815,https://github.com/github/accessibility/issues/815,2022-04-06T01:53:21Z,[Story]SetupExperimentalcomponentfilesinDotcomforActionMenu
        testuser,https://github.com/github/accessibility/issues/814,https://github.com/github/accessibility/issues/814,2022-04-06T01:53:21Z,[SubTask]AutocompleteinDotcom:updateinstancesinsponsors
        testuser,https://github.com/github/accessibility/issues/813,https://github.com/github/accessibility/issues/813,2022-04-06T01:53:21Z,[SubTask]AutocompleteinDotcom:updateinstancesininvitations
        testuser,https://github.com/github/accessibility/issues/812,https://github.com/github/accessibility/issues/812,2022-04-06T01:53:21Z,[SubTask]AutocompleteinDotcom:updateinstancesintoggleable_features
        testuser,https://github.com/github/accessibility/issues/811,https://github.com/github/accessibility/issues/811,2022-04-06T01:53:21Z,[SubTask]AutocompleteinDotcom:updateinstancesinfeature_flags
        testuser,https://github.com/github/accessibility/issues/810,https://github.com/github/accessibility/issues/810,2022-04-06T01:53:21Z,[SubTask]AutocompleteinDotcom:updateinstancesinbilling_managers
        testuser,https://github.com/github/accessibility/issues/809,https://github.com/github/accessibility/issues/809,2022-04-06T01:53:21Z,[SubTask]AutocompleteinDotcom:updateinstancesinstafftools
        testuser,https://github.com/github/accessibility/issues/808,https://github.com/github/accessibility/issues/808,2022-04-06T01:53:21Z,[AsyncMeeting]FileTreeAuditRefining
        testuser,https://github.com/github/accessibility/issues/807,https://github.com/github/accessibility/issues/807,2022-04-06T01:53:21Z,[EPIC]TooltipMaturity
        testuser,https://github.com/github/accessibility/issues/804,https://github.com/github/accessibility/issues/804,2022-04-06T01:53:21Z,[Story][Documentation][CommonPattern]FontSizesandSupportingZoom/Resizing(withlinkinTheHub)
        testuser,https://github.com/github/accessibility/issues/800,https://github.com/github/accessibility/issues/800,2022-04-06T01:53:21Z,[Deep-dive]Topic:AccessibilitySettings:Enablingcustomizationfortherightreasons
        testuser,https://github.com/github/accessibility/issues/799,https://github.com/github/accessibility/issues/799,2022-04-06T01:53:21Z,[Deep-dive]Topic:MakingChartsandGraphsAccessible
        testuser,https://github.com/github/accessibility/issues/798,https://github.com/github/accessibility/issues/798,2022-04-06T01:53:21Z,\"[Deep-dive]Topic:ATAG:Whatisit,andhowdoesitoverlapwithWCAG?\"
        testuser,https://github.com/github/accessibility/issues/797,https://github.com/github/accessibility/issues/797,2022-04-06T01:53:21Z,[Story]CreateabranchinDotcomtoenableAccessibilityteammemberstoupdatethe5Autocompleteusecases
        testuser,https://github.com/github/accessibility/issues/796,https://github.com/github/accessibility/issues/796,2022-04-06T01:53:21Z,[Story]BumpPrimerViewComponents'sauto-complete-elementversionandpublish
        testuser,https://github.com/github/accessibility/issues/795,https://github.com/github/accessibility/issues/795,2022-04-06T01:53:21Z,[Batch]PrimerAutocompleteversionbump
        testuser,https://github.com/github/accessibility/issues/791,https://github.com/github/accessibility/issues/791,2022-04-06T01:53:21Z,[Batch]DiscussionsValidationofourSelf-ServePlatform
        testuser,https://github.com/github/accessibility/issues/790,https://github.com/github/accessibility/issues/790,2022-04-06T01:53:21Z,\"[Deep-dive]Topic:PageandNavigationtransitions,DynamicContent,andSPAs\"
        testuser,https://github.com/github/accessibility/issues/789,https://github.com/github/accessibility/issues/789,2022-04-06T01:53:21Z,[Story]AddaLastAuditSHAinmetadataofPrimercomponents
        testuser,https://github.com/github/accessibility/issues/783,https://github.com/github/accessibility/issues/783,2022-04-06T01:53:21Z,[Batch]StarttheExperimentalActionMenucomponentinDotcom
        testuser,https://github.com/github/accessibility/issues/776,https://github.com/github/accessibility/issues/776,2022-04-06T01:53:21Z,[Deep-dive]Topic:SpreadsheetsarenotForms
        testuser,https://github.com/github/accessibility/issues/733,https://github.com/github/accessibility/issues/733,2022-04-06T01:53:21Z,[Story][Documentation][CommonPattern]ManagingFocus
        testuser,https://github.com/github/accessibility/issues/732,https://github.com/github/accessibility/issues/732,2022-04-06T01:53:21Z,\"[Story][Documentation]HowtoTalkaboutDisability:People-FirstversusIdentity,Impairment,etc.\"
        testuser,https://github.com/github/accessibility/issues/731,https://github.com/github/accessibility/issues/731,2022-04-06T01:53:21Z,[Story][Documentation]WheretofindInternalandExternal(vetted)AccessibilityResources
        testuser,https://github.com/github/accessibility/issues/645,https://github.com/github/accessibility/issues/645,2022-04-06T01:53:21Z,[EPIC][Documentation]PrimerAccessibilityCommonPatterns
        testuser,https://github.com/github/accessibility/issues/643,https://github.com/github/accessibility/issues/643,2022-04-06T01:53:21Z,[EPIC][Training]EnableallHubberstobeAccessibilityAware
        testuser,https://github.com/github/accessibility/issues/642,https://github.com/github/accessibility/issues/642,2022-04-06T01:53:21Z,[Story]ReviewandPrepOnboardingtrainingfromMicrosoftresourcesfornewHubbers(Level1)
        testuser,https://github.com/github/accessibility/issues/641,https://github.com/github/accessibility/issues/641,2022-04-06T01:53:21Z,\"[EPIC][Documentation]TheBasics:Audits,Roles,andHowtodoAccessibilityWork\"
        testuser,https://github.com/github/accessibility/issues/639,https://github.com/github/accessibility/issues/639,2022-04-06T01:53:21Z,[EPIC][Tooling]AxeScan
        testuser,https://github.com/github/accessibility/issues/604,https://github.com/github/accessibility/issues/604,2022-04-06T01:53:21Z,[Bug]FocusislostafterAssigningsomeonetoanIssue
        testuser,https://github.com/github/accessibility/issues/587,https://github.com/github/accessibility/issues/587,2022-04-06T01:53:21Z,[Story][Documentation][CommonPattern]Designingalinkforeveryone
        testuser,https://github.com/github/accessibility/issues/559,https://github.com/github/accessibility/issues/559,2022-04-06T01:53:21Z,[Chore]Cleanupexistingdocumentationandremoveextras
        testuser,https://github.com/github/accessibility/issues/524,https://github.com/github/accessibility/issues/524,2022-04-06T01:53:21Z,[ReviewRequest]DocumentationTeam:SearchDocsfunctionality
        testuser,https://github.com/github/accessibility/issues/508,https://github.com/github/accessibility/issues/508,2022-04-06T01:53:21Z,[Story][Documentation][CommonPattern]AddingContexttoButtons
        testuser,https://github.com/github/accessibility/issues/506,https://github.com/github/accessibility/issues/506,2022-04-06T01:53:21Z,[EPIC][Tracking]EmojiPickercomponent
        testuser,https://github.com/github/accessibility/issues/505,https://github.com/github/accessibility/issues/505,2022-04-06T01:53:21Z,[Tracking]Dropdowncomponent
        testuser,https://github.com/github/accessibility/issues/502,https://github.com/github/accessibility/issues/502,2022-04-06T01:53:21Z,[Tracking]6High-ImpactComponents
        testuser,https://github.com/github/accessibility/issues/499,https://github.com/github/accessibility/issues/499,2022-04-06T01:53:21Z,[Story][Documentation]Outlineofthe3LevelsofAccessibilityTrainingatGitHub
        testuser,https://github.com/github/accessibility/issues/498,https://github.com/github/accessibility/issues/498,2022-04-06T01:53:21Z,[Story][Documentation]Create*HowtoSetUpyourEnvironmentforAccessibility*inTheHub
        testuser,https://github.com/github/accessibility/issues/496,https://github.com/github/accessibility/issues/496,2022-04-06T01:53:21Z,\"[Tracking]\"\"Self-ServePlatform\"\"groupedbyLocation\"
        testuser,https://github.com/github/accessibility/issues/495,https://github.com/github/accessibility/issues/495,2022-04-06T01:53:21Z,[Story][Documentation]Create*HowtoGetHelp*documentationinTheHub
        testuser,https://github.com/github/accessibility/issues/491,https://github.com/github/accessibility/issues/491,2022-04-06T01:53:21Z,[INITIATIVE]6High-ImpactComponents
        testuser,https://github.com/github/accessibility/issues/385,https://github.com/github/accessibility/issues/385,2022-04-06T01:53:21Z,[Story]Autocompletecomponent:Updateaccessibility-relatedinformationincomponentdocumentationinPrimer
        testuser,https://github.com/github/accessibility/issues/378,https://github.com/github/accessibility/issues/378,2022-04-06T01:53:21Z,[Story][SearchAutocomplete]ImplementnewSearch/AutocompletecomponentinDiscussionsdashboard
        testuser,https://github.com/github/accessibility/issues/373,https://github.com/github/accessibility/issues/373,2022-04-06T01:53:21Z,[Story][SearchAutocomplete]ReworkAutocompleteinPrimertohaveamoreaccessibleAPI
        `.replace(/[ \t\r]+/g, '');
        expect(csv.replace(/[ \t\r]+/g, '')).toEqual(expectedOutput);
    })

    test('issueComments', async () => {
        const data = await getAllWorkForRepository('github', 'accessibility', 'inkblotty', '2021-12-01');
        const csv = await handleGraphData("testuser", [[data.issueComments]])
        const expectedOutput = `actor,target,url,created_at,title
        inkblotty,https://github.com/github/accessibility/issues/1028,https://github.com/github/accessibility/issues/1028#issuecomment-1116319954,2022-05-03T16:45:19Z,[Story][AxeFundamental]UseDatadogtocollecttheresultsofAxescans
        inkblotty,https://github.com/github/accessibility/issues/1028,https://github.com/github/accessibility/issues/1028#issuecomment-1129272162,2022-05-17T20:09:30Z,[Story][AxeFundamental]UseDatadogtocollecttheresultsofAxescans
        inkblotty,https://github.com/github/accessibility/issues/1032,https://github.com/github/accessibility/issues/1032#issuecomment-1108964181,2022-04-25T19:38:32Z,[Chore]AddMy-Work-Action
        inkblotty,https://github.com/github/accessibility/issues/1032,https://github.com/github/accessibility/issues/1032#issuecomment-1151413623,2022-06-09T17:39:51Z,[Chore]AddMy-Work-Action
        inkblotty,https://github.com/github/accessibility/issues/1032,https://github.com/github/accessibility/issues/1032#issuecomment-1152774757,2022-06-10T22:18:50Z,[Chore]AddMy-Work-Action
        inkblotty,https://github.com/github/accessibility/issues/1032,https://github.com/github/accessibility/issues/1032#issuecomment-1152775669,2022-06-10T22:21:02Z,[Chore]AddMy-Work-Action
        inkblotty,https://github.com/github/accessibility/issues/1032,https://github.com/github/accessibility/issues/1032#issuecomment-1154471325,2022-06-13T21:47:00Z,[Chore]AddMy-Work-Action
        inkblotty,https://github.com/github/accessibility/issues/1060,https://github.com/github/accessibility/issues/1060#issuecomment-1104454644,2022-04-20T21:04:37Z,[SprintOverview]FY22Q4Sprint2
        inkblotty,https://github.com/github/accessibility/issues/1060,https://github.com/github/accessibility/issues/1060#issuecomment-1104457722,2022-04-20T21:08:43Z,[SprintOverview]FY22Q4Sprint2
        inkblotty,https://github.com/github/accessibility/issues/1060,https://github.com/github/accessibility/issues/1060#issuecomment-1106546327,2022-04-22T14:00:17Z,[SprintOverview]FY22Q4Sprint2
        inkblotty,https://github.com/github/accessibility/issues/1060,https://github.com/github/accessibility/issues/1060#issuecomment-1108728862,2022-04-25T15:33:03Z,[SprintOverview]FY22Q4Sprint2
        inkblotty,https://github.com/github/accessibility/issues/1060,https://github.com/github/accessibility/issues/1060#issuecomment-1112457166,2022-04-28T17:12:49Z,[SprintOverview]FY22Q4Sprint2
        inkblotty,https://github.com/github/accessibility/issues/1060,https://github.com/github/accessibility/issues/1060#issuecomment-1116735584,2022-05-03T22:56:02Z,[SprintOverview]FY22Q4Sprint2
        inkblotty,https://github.com/github/accessibility/issues/1060,https://github.com/github/accessibility/issues/1060#issuecomment-1117932089,2022-05-04T20:57:48Z,[SprintOverview]FY22Q4Sprint2
        inkblotty,https://github.com/github/accessibility/issues/1060,https://github.com/github/accessibility/issues/1060#issuecomment-1121173802,2022-05-09T14:25:26Z,[SprintOverview]FY22Q4Sprint2
        inkblotty,https://github.com/github/accessibility/issues/1061,https://github.com/github/accessibility/issues/1061#issuecomment-1117565552,2022-05-04T16:35:39Z,\"[Meeting]OfficeHoursMay4,2022\"
        inkblotty,https://github.com/github/accessibility/issues/1061,https://github.com/github/accessibility/issues/1061#issuecomment-1129081507,2022-05-17T16:33:08Z,\"[Meeting]OfficeHoursMay4,2022\"
        inkblotty,https://github.com/github/accessibility/issues/1065,https://github.com/github/accessibility/issues/1065#issuecomment-1105548495,2022-04-21T18:01:07Z,[EPIC]CareersPageRemediation
        inkblotty,https://github.com/github/accessibility/issues/1065,https://github.com/github/accessibility/issues/1065#issuecomment-1111051803,2022-04-27T14:10:25Z,[EPIC]CareersPageRemediation
        inkblotty,https://github.com/github/accessibility/issues/1065,https://github.com/github/accessibility/issues/1065#issuecomment-1152496635,2022-06-10T15:43:33Z,[EPIC]CareersPageRemediation
        inkblotty,https://github.com/github/accessibility/issues/1071,https://github.com/github/accessibility/issues/1071#issuecomment-1142326374,2022-05-31T16:04:08Z,[Epic]CoachinginMemex
        inkblotty,https://github.com/github/accessibility/issues/1080,https://github.com/github/accessibility/issues/1080#issuecomment-1110240127,2022-04-26T20:55:39Z,[Story][AxeFundamental]Betterdeveloperexperienceforsurfacingaxeissues
        inkblotty,https://github.com/github/accessibility/issues/1086,https://github.com/github/accessibility/issues/1086#issuecomment-1139932436,2022-05-27T18:40:26Z,[Story][AuditMetrics]CreateascorecardinourServiceCatalogforAccessibility
        inkblotty,https://github.com/github/accessibility/issues/1101,https://github.com/github/accessibility/issues/1101#issuecomment-1115071726,2022-05-02T16:05:43Z,[SprintOverview]FY22Q4Sprint3
        inkblotty,https://github.com/github/accessibility/issues/1101,https://github.com/github/accessibility/issues/1101#issuecomment-1115123269,2022-05-02T16:59:40Z,[SprintOverview]FY22Q4Sprint3
        inkblotty,https://github.com/github/accessibility/issues/1101,https://github.com/github/accessibility/issues/1101#issuecomment-1121172888,2022-05-09T14:24:47Z,[SprintOverview]FY22Q4Sprint3
        inkblotty,https://github.com/github/accessibility/issues/1101,https://github.com/github/accessibility/issues/1101#issuecomment-1121200217,2022-05-09T14:46:16Z,[SprintOverview]FY22Q4Sprint3
        inkblotty,https://github.com/github/accessibility/issues/1101,https://github.com/github/accessibility/issues/1101#issuecomment-1125452637,2022-05-12T21:50:56Z,[SprintOverview]FY22Q4Sprint3
        inkblotty,https://github.com/github/accessibility/issues/1101,https://github.com/github/accessibility/issues/1101#issuecomment-1129391929,2022-05-17T22:42:59Z,[SprintOverview]FY22Q4Sprint3
        inkblotty,https://github.com/github/accessibility/issues/1101,https://github.com/github/accessibility/issues/1101#issuecomment-1134757900,2022-05-23T14:34:47Z,[SprintOverview]FY22Q4Sprint3
        inkblotty,https://github.com/github/accessibility/issues/1101,https://github.com/github/accessibility/issues/1101#issuecomment-1134757927,2022-05-23T14:34:48Z,[SprintOverview]FY22Q4Sprint3
        inkblotty,https://github.com/github/accessibility/issues/1105,https://github.com/github/accessibility/issues/1105#issuecomment-1130369534,2022-05-18T18:29:59Z,[Deep-dive]Topic:AudioDescriptionsandAccessibleVideoContent
        inkblotty,https://github.com/github/accessibility/issues/1113,https://github.com/github/accessibility/issues/1113#issuecomment-1136121914,2022-05-24T16:09:29Z,[ReviewRequest][ReactFramework]ReviewtheGitHubHeaderandensureitmeetsallAccessibilityrequirements
        inkblotty,https://github.com/github/accessibility/issues/1140,https://github.com/github/accessibility/issues/1140#issuecomment-1126399570,2022-05-13T19:44:23Z,[Story][CoachingMetrics]Adddocumentationforhowtoaddourengagementtoolstoanygivenrepository
        inkblotty,https://github.com/github/accessibility/issues/1154,https://github.com/github/accessibility/issues/1154#issuecomment-1156649456,2022-06-15T15:56:06Z,[Story][AxeFundamental]WriteaTheHubpostannouncingwhatAxeisandhowtoreachusaboutyourexperience
        inkblotty,https://github.com/github/accessibility/issues/1154,https://github.com/github/accessibility/issues/1154#issuecomment-1156749764,2022-06-15T17:34:46Z,[Story][AxeFundamental]WriteaTheHubpostannouncingwhatAxeisandhowtoreachusaboutyourexperience
        inkblotty,https://github.com/github/accessibility/issues/1159,https://github.com/github/accessibility/issues/1159#issuecomment-1136458715,2022-05-24T21:41:14Z,[Story][OurProgress]TrackthenumberofAccessibilitylinting(erblint)rulesindotcom
        inkblotty,https://github.com/github/accessibility/issues/1160,https://github.com/github/accessibility/issues/1160#issuecomment-1148990898,2022-06-07T17:52:54Z,[Story][OurProgress]Trackthesatisfactionreportedfromourdocumentationtoguideareasofimprovement
        inkblotty,https://github.com/github/accessibility/issues/1161,https://github.com/github/accessibility/issues/1161#issuecomment-1129159501,2022-05-17T17:59:49Z,[ReviewRequest][ReactFramework]ReviewtheGitHubFooterandensureitmeetsallAccessibilityrequirements
        inkblotty,https://github.com/github/accessibility/issues/1161,https://github.com/github/accessibility/issues/1161#issuecomment-1145411431,2022-06-02T22:41:04Z,[ReviewRequest][ReactFramework]ReviewtheGitHubFooterandensureitmeetsallAccessibilityrequirements
        inkblotty,https://github.com/github/accessibility/issues/1161,https://github.com/github/accessibility/issues/1161#issuecomment-1147669545,2022-06-06T16:59:19Z,[ReviewRequest][ReactFramework]ReviewtheGitHubFooterandensureitmeetsallAccessibilityrequirements
        inkblotty,https://github.com/github/accessibility/issues/1165,https://github.com/github/accessibility/issues/1165#issuecomment-1134856525,2022-05-23T15:58:24Z,[SprintOverview]FY22Q4Sprint4
        inkblotty,https://github.com/github/accessibility/issues/1165,https://github.com/github/accessibility/issues/1165#issuecomment-1140073016,2022-05-27T22:11:41Z,[SprintOverview]FY22Q4Sprint4
        inkblotty,https://github.com/github/accessibility/issues/1165,https://github.com/github/accessibility/issues/1165#issuecomment-1142514152,2022-05-31T18:34:05Z,[SprintOverview]FY22Q4Sprint4
        inkblotty,https://github.com/github/accessibility/issues/1165,https://github.com/github/accessibility/issues/1165#issuecomment-1145340745,2022-06-02T21:05:23Z,[SprintOverview]FY22Q4Sprint4
        inkblotty,https://github.com/github/accessibility/issues/1165,https://github.com/github/accessibility/issues/1165#issuecomment-1147550823,2022-06-06T15:04:53Z,[SprintOverview]FY22Q4Sprint4
        inkblotty,https://github.com/github/accessibility/issues/1169,https://github.com/github/accessibility/issues/1169#issuecomment-1137855988,2022-05-25T21:16:24Z,[AsyncMeeting]SecurityCenterRefiningRequest
        inkblotty,https://github.com/github/accessibility/issues/1169,https://github.com/github/accessibility/issues/1169#issuecomment-1142345706,2022-05-31T16:21:53Z,[AsyncMeeting]SecurityCenterRefiningRequest
        inkblotty,https://github.com/github/accessibility/issues/1170,https://github.com/github/accessibility/issues/1170#issuecomment-1137642975,2022-05-25T17:53:42Z,\"[Deep-dive]Topic:MoreonMarkdown:HeadingorderinIssues,Discussions,PRDescriptionsetc.\"
        inkblotty,https://github.com/github/accessibility/issues/1171,https://github.com/github/accessibility/issues/1171#issuecomment-1143937384,2022-06-01T17:37:34Z,[Deep-dive]Topic:DemoofusingGitHubwithascreenreaderandhowtopairwithablinddeveloper
        inkblotty,https://github.com/github/accessibility/issues/1171,https://github.com/github/accessibility/issues/1171#issuecomment-1143952122,2022-06-01T17:50:33Z,[Deep-dive]Topic:DemoofusingGitHubwithascreenreaderandhowtopairwithablinddeveloper
        inkblotty,https://github.com/github/accessibility/issues/1171,https://github.com/github/accessibility/issues/1171#issuecomment-1150093414,2022-06-08T15:48:21Z,[Deep-dive]Topic:DemoofusingGitHubwithascreenreaderandhowtopairwithablinddeveloper
        inkblotty,https://github.com/github/accessibility/issues/1173,https://github.com/github/accessibility/issues/1173#issuecomment-1156685490,2022-06-15T16:29:52Z,[Deep-dive]Topic:WCAG2.2and3.0--What'scomingupnext?
        inkblotty,https://github.com/github/accessibility/issues/1173,https://github.com/github/accessibility/issues/1173#issuecomment-1156716571,2022-06-15T16:59:14Z,[Deep-dive]Topic:WCAG2.2and3.0--What'scomingupnext?
        inkblotty,https://github.com/github/accessibility/issues/1173,https://github.com/github/accessibility/issues/1173#issuecomment-1156764995,2022-06-15T17:52:23Z,[Deep-dive]Topic:WCAG2.2and3.0--What'scomingupnext?
        inkblotty,https://github.com/github/accessibility/issues/1174,https://github.com/github/accessibility/issues/1174#issuecomment-1149964546,2022-06-08T14:05:08Z,\"[Deep-dive]Topic:Whichaccessibilityresourcesaretrustworthy,andwhichcoulduseourhelp?\"
        inkblotty,https://github.com/github/accessibility/issues/1174,https://github.com/github/accessibility/issues/1174#issuecomment-1150083493,2022-06-08T15:39:45Z,\"[Deep-dive]Topic:Whichaccessibilityresourcesaretrustworthy,andwhichcoulduseourhelp?\"
        inkblotty,https://github.com/github/accessibility/issues/1174,https://github.com/github/accessibility/issues/1174#issuecomment-1150085561,2022-06-08T15:41:30Z,\"[Deep-dive]Topic:Whichaccessibilityresourcesaretrustworthy,andwhichcoulduseourhelp?\"
        inkblotty,https://github.com/github/accessibility/issues/1179,https://github.com/github/accessibility/issues/1179#issuecomment-1154107621,2022-06-13T16:06:08Z,\"[Audit]GitHubCopilot,PluginsacrossSupportedIDEs\"
        inkblotty,https://github.com/github/accessibility/issues/1181,https://github.com/github/accessibility/issues/1181#issuecomment-1142604352,2022-05-31T20:21:36Z,\"[Audit]Insights,InsightsforProjects📈\"
        inkblotty,https://github.com/github/accessibility/issues/1192,https://github.com/github/accessibility/issues/1192#issuecomment-1144120125,2022-06-01T20:48:47Z,[Story][Axefundamentals]SyncwithWebSystems
        inkblotty,https://github.com/github/accessibility/issues/1214,https://github.com/github/accessibility/issues/1214#issuecomment-1150280510,2022-06-08T18:56:26Z,[Story][AuditMetrics]AutomatethetotalcountofAuditissuesthathavegonestale(>90dayswithnoremediation)
        inkblotty,https://github.com/github/accessibility/issues/1214,https://github.com/github/accessibility/issues/1214#issuecomment-1151411729,2022-06-09T17:37:48Z,[Story][AuditMetrics]AutomatethetotalcountofAuditissuesthathavegonestale(>90dayswithnoremediation)
        inkblotty,https://github.com/github/accessibility/issues/1214,https://github.com/github/accessibility/issues/1214#issuecomment-1156595107,2022-06-15T15:08:34Z,[Story][AuditMetrics]AutomatethetotalcountofAuditissuesthathavegonestale(>90dayswithnoremediation)
        inkblotty,https://github.com/github/accessibility/issues/1222,https://github.com/github/accessibility/issues/1222#issuecomment-1144005266,2022-06-01T18:43:02Z,[Story][AxeFundamental]SetupaDatadogmonitoringalerttoping#accessibility-opswhenperformanceisbad
        inkblotty,https://github.com/github/accessibility/issues/1229,https://github.com/github/accessibility/issues/1229#issuecomment-1151465717,2022-06-09T18:29:36Z,\"[Meeting]OfficeHoursJune8,2022\"
        inkblotty,https://github.com/github/accessibility/issues/1231,https://github.com/github/accessibility/issues/1231#issuecomment-1147577212,2022-06-06T15:25:46Z,[SprintOverview]FY22Q4Sprint5
        inkblotty,https://github.com/github/accessibility/issues/1231,https://github.com/github/accessibility/issues/1231#issuecomment-1156816527,2022-06-15T18:54:36Z,[SprintOverview]FY22Q4Sprint5
        inkblotty,https://github.com/github/accessibility/issues/1232,https://github.com/github/accessibility/issues/1232#issuecomment-1145519471,2022-06-03T02:13:17Z,RequestFirstResponderapptobeaddedtonewaccessibility-ownedrepos
        inkblotty,https://github.com/github/accessibility/issues/1239,https://github.com/github/accessibility/issues/1239#issuecomment-1149205028,2022-06-07T21:51:32Z,\"[Audit]Blackbird,Blackbirdsearchindotcom\"
        inkblotty,https://github.com/github/accessibility/issues/1239,https://github.com/github/accessibility/issues/1239#issuecomment-1150485746,2022-06-08T22:44:55Z,\"[Audit]Blackbird,Blackbirdsearchindotcom\"
        inkblotty,https://github.com/github/accessibility/issues/1239,https://github.com/github/accessibility/issues/1239#issuecomment-1156763085,2022-06-15T17:50:07Z,\"[Audit]Blackbird,Blackbirdsearchindotcom\"
        inkblotty,https://github.com/github/accessibility/issues/1239,https://github.com/github/accessibility/issues/1239#issuecomment-1157752152,2022-06-16T14:52:14Z,\"[Audit]Blackbird,Blackbirdsearchindotcom\"
        inkblotty,https://github.com/github/accessibility/issues/1239,https://github.com/github/accessibility/issues/1239#issuecomment-1157770271,2022-06-16T15:07:41Z,\"[Audit]Blackbird,Blackbirdsearchindotcom\"
        inkblotty,https://github.com/github/accessibility/issues/1239,https://github.com/github/accessibility/issues/1239#issuecomment-1157798281,2022-06-16T15:30:21Z,\"[Audit]Blackbird,Blackbirdsearchindotcom\"
        inkblotty,https://github.com/github/accessibility/issues/1272,https://github.com/github/accessibility/issues/1272#issuecomment-1150146027,2022-06-08T16:38:41Z,EducationGlobalCampusRefiningRequest
        inkblotty,https://github.com/github/accessibility/issues/1272,https://github.com/github/accessibility/issues/1272#issuecomment-1155488986,2022-06-14T17:23:57Z,EducationGlobalCampusRefiningRequest
        inkblotty,https://github.com/github/accessibility/issues/1272,https://github.com/github/accessibility/issues/1272#issuecomment-1156574691,2022-06-15T14:51:22Z,EducationGlobalCampusRefiningRequest
        inkblotty,https://github.com/github/accessibility/issues/1272,https://github.com/github/accessibility/issues/1272#issuecomment-1156692919,2022-06-15T16:36:56Z,EducationGlobalCampusRefiningRequest
        inkblotty,https://github.com/github/accessibility/issues/1276,https://github.com/github/accessibility/issues/1276#issuecomment-1154475247,2022-06-13T21:51:46Z,[Story]ChatopstoeasilyaddaquickrecommendationfromSlacktoourinternaldocumentation
        inkblotty,https://github.com/github/accessibility/issues/1277,https://github.com/github/accessibility/issues/1277#issuecomment-1150026124,2022-06-08T14:51:53Z,[A11yDesignreview]Circleprogressbarontheexploretool
        inkblotty,https://github.com/github/accessibility/issues/1281,https://github.com/github/accessibility/issues/1281#issuecomment-1149956049,2022-06-08T13:58:38Z,🤖YourHowielabelsinyourrepositorywillbestandardizedincomingweeks
        inkblotty,https://github.com/github/accessibility/issues/1286,https://github.com/github/accessibility/issues/1286#issuecomment-1150473642,2022-06-08T22:24:08Z,[Story][Axefundamentals]Re-enableaxeindevelopment
        inkblotty,https://github.com/github/accessibility/issues/1325,https://github.com/github/accessibility/issues/1325#issuecomment-1157998319,2022-06-16T18:21:10Z,[AsyncMeeting]BillingFormRefiningRequest
        `.replace(/[ \t\r]+/g, '');
        expect(csv.replace(/[ \t\r]+/g, '')).toEqual(expectedOutput);
    })

    test('prsCreated', async () => {
        const data = await getAllWorkForRepository('github', 'accessibility', 'inkblotty', '2021-12-01');
        const csv = await handleGraphData("testuser", [[data.prsCreated]])
        const expectedOutput = `actor,target,url,created_at,title
        testuser,https://github.com/github/accessibility/pull/1062,https://github.com/github/accessibility/pull/1062,2022-04-20T21:22:40Z,Createsprint-overview.md
        testuser,https://github.com/github/accessibility/pull/1055,https://github.com/github/accessibility/pull/1055,2022-04-20T15:12:15Z,[Proposal]NewFRpolicy
        testuser,https://github.com/github/accessibility/pull/1029,https://github.com/github/accessibility/pull/1029,2022-04-15T14:58:38Z,Createmy-work.yml
        testuser,https://github.com/github/accessibility/pull/1001,https://github.com/github/accessibility/pull/1001,2022-04-07T15:03:32Z,Updatehow-we-work.mdtoimprovetabstops
        testuser,https://github.com/github/accessibility/pull/990,https://github.com/github/accessibility/pull/990,2022-04-05T19:32:54Z,AlltheupdatestoourDailyUpdateworkflow
        testuser,https://github.com/github/accessibility/pull/988,https://github.com/github/accessibility/pull/988,2022-04-05T18:31:36Z,Updateoffice-hours-meeting.mdtoalignwithdeepdivetemplate
        testuser,https://github.com/github/accessibility/pull/986,https://github.com/github/accessibility/pull/986,2022-04-05T15:52:21Z,Createdaily-update-comment.yml
        testuser,https://github.com/github/accessibility/pull/985,https://github.com/github/accessibility/pull/985,2022-04-04T19:46:16Z,Automation:Testingdaily-update
        testuser,https://github.com/github/accessibility/pull/977,https://github.com/github/accessibility/pull/977,2022-04-01T14:58:58Z,UpdateAuditProcesstocross-linktoTheHub
        testuser,https://github.com/github/accessibility/pull/972,https://github.com/github/accessibility/pull/972,2022-03-31T23:58:05Z,[Docs]ProcessforPrimerauditissues&InitialoutlineofAccessibilityownershipbetweena11yEngandPrimer
        testuser,https://github.com/github/accessibility/pull/915,https://github.com/github/accessibility/pull/915,2022-03-17T22:32:03Z,Updatehww.env
        testuser,https://github.com/github/accessibility/pull/911,https://github.com/github/accessibility/pull/911,2022-03-17T17:27:59Z,Updatedeep-dive.yml
        testuser,https://github.com/github/accessibility/pull/886,https://github.com/github/accessibility/pull/886,2022-03-11T19:30:54Z,Updatea11y-audit-request.md
        testuser,https://github.com/github/accessibility/pull/880,https://github.com/github/accessibility/pull/880,2022-03-10T18:41:52Z,FixlabelsonRefiningtemplate
        testuser,https://github.com/github/accessibility/pull/872,https://github.com/github/accessibility/pull/872,2022-03-09T15:49:27Z,CreateFolderforAxeConnotes
        testuser,https://github.com/github/accessibility/pull/835,https://github.com/github/accessibility/pull/835,2022-03-02T16:05:00Z,Updatedeep-dive.ymltoaddtimezones
        `.replace(/[ \t\r]+/g, '');
        expect(csv.replace(/[ \t\r]+/g, '')).toEqual(expectedOutput);
    })

    test('prCommits', async () => {
        const data = await getAllWorkForRepository('github', 'accessibility', 'inkblotty', '2021-12-01');
        const csv = await handleGraphData("testuser", [[data.prCommits]])
        const expectedOutput = `actor,target,url,created_at,title
        `.replace(/[ \t\r]+/g, '');
        expect(csv).toEqual(expectedOutput);
    })

    test('prComments', async () => {
        const data = await getAllWorkForRepository('github', 'accessibility', 'inkblotty', '2021-12-01');
        const csv = await handleGraphData("testuser", [[data.prComments]])
        const expectedOutput = `actor,target,url,created_at,title
        testuser,https://github.com/github/accessibility-scorecard/pull/12#discussion_r892994772,https://github.com/github/accessibility-scorecard/pull/12#discussion_r892994772,2022-06-09T01:33:50Z,
        testuser,https://github.com/github/accessibility-scorecard/pull/12#discussion_r892995249,https://github.com/github/accessibility-scorecard/pull/12#discussion_r892995249,2022-06-09T01:35:18Z,
        testuser,https://github.com/github/accessibility-scorecard/pull/12#discussion_r892995503,https://github.com/github/accessibility-scorecard/pull/12#discussion_r892995503,2022-06-09T01:35:58Z,
        testuser,https://github.com/github/accessibility-scorecard/pull/12#discussion_r892998140,https://github.com/github/accessibility-scorecard/pull/12#discussion_r892998140,2022-06-09T01:43:06Z,
        testuser,https://github.com/github/accessibility-scorecard/pull/12#discussion_r892998794,https://github.com/github/accessibility-scorecard/pull/12#discussion_r892998794,2022-06-09T01:44:56Z,
        testuser,https://github.com/github/accessibility-scorecard/pull/12#discussion_r892999751,https://github.com/github/accessibility-scorecard/pull/12#discussion_r892999751,2022-06-09T01:47:21Z,
        testuser,https://github.com/github/accessibility-scorecard/pull/12#discussion_r893000227,https://github.com/github/accessibility-scorecard/pull/12#discussion_r893000227,2022-06-09T01:48:41Z,
        testuser,https://github.com/github/accessibility-scorecard/pull/12#discussion_r893000593,https://github.com/github/accessibility-scorecard/pull/12#discussion_r893000593,2022-06-09T01:49:38Z,
        testuser,https://github.com/github/accessibility-scorecard/pull/12#discussion_r893001944,https://github.com/github/accessibility-scorecard/pull/12#discussion_r893001944,2022-06-09T01:53:18Z,
        `.replace(/[ \t\r]+/g, '');
        expect(csv).toEqual(expectedOutput);
    })

});

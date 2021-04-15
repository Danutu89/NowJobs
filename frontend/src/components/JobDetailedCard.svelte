<script lang="ts">
	import { Button } from '$vendor/mase';
	import JobApplyCard from './JobApplyCard.svelte';

	export let job;
</script>

<div class="card">
	<div class="header">
		<h1 class="title">Full Stack Developer</h1>

		<div class="details">
			<div class="location">icon Iasi,Romania</div>
			<div class="remote">Remote</div>
		</div>
	</div>
	<hr />
	<div class="description">
		UI / UX front end Developer independent contractor (Remote-friendly) Apply to join our community
		of highly skilled independent contractors. EASE Defined: Entrepreneurs, Adopting, To Serve, Each
		Other EASE offers A predictive freelance management system that gives organizations access to a
		tailored and screened pool of on-demand remote talent. Job Description: Overall Purpose UX/UI
		designer is responsible for creating user interfaces. This position will be the center of our
		design process and ensure that we create the best customer experience. Responsibilities:
		Participate in the analysis of user research and translate abstract ideas and requirements into
		tangible artifacts such as journey maps, user personas, empathy maps, storyboards, and relevant
		assessment deliverables. Collaborate with Designers, Product Managers, Engineers, and
		Stakeholders to ideate strategize and brainstorm ideas. Create visualizations, site maps, user
		flows, wireframes, low- to high-fidelity mockups, and prototypes; and iterate on designs based
		on stakeholder, user, and customer feedback. Manage projects independently throughout the scope
		of the project. Support multiple projects simultaneously while meeting tight deadlines. Keep up
		with emerging technologies and industry standards for UI/UX design and it's methods. Maintain a
		high level of aesthetic details and production quality that reflect brand guidelines. Keep track
		of evolving UI components, design patterns, and other artifacts to maintain ACR Design System
		up-to-date. Requirements : Front-end Code development HTML-CSS-Java Script Expert at building
		consensus and driving forward motion Expert communicator - able to inspire and sell a vision
		Experience applying research and analysis to site development Proven interpersonal skills,
		client relation skills and ability to work in a team environment Proven creative thinking and
		problem-solving skills Proven understanding of and experience with: user-centered design
		techniques; development of organizational/structural concepts; project processes for the
		development of large scale projects; documentation requirements for development teams;
		application of content management, personalization, targeting and searching systems Thorough,
		detail-oriented and highly organized, including the ability to multi-task and meet tight
		deadlines Preferably, experience with: software development process/business analysis; user
		research, usability practices, and testing Bachelor's degree preferred, with multidisciplinary
		backgrounds such as psychology, computer science, information sciences, human/computer interface
		design or commerce/business or experience equivalent At least 2 years' related industry
		experience in new media, information technology, communications, or library/information science
	</div>

	{#if false}
		<hr />
		<Button
			styles="padding: 0.6rem 2rem;border-radius: 20px;width: calc(100% - 4rem);"
			centered
			color="secondary">Fast Apply</Button
		>
	{:else if true}
		<hr />
		<JobApplyCard />
	{/if}
</div>

<style lang="scss">
	@import '../src/vendor/mase/globals.scss';

	.card {
		margin-right: 1rem;
		width: 800px;
		background: $background-secondary;
		border-radius: 10px;
		border: 1px solid darken($color: $background, $amount: 5);
		padding: 1rem 2rem;

		.header {
			.title {
				margin: 0;
			}

			.details {
				display: flex;
				flex-flow: column;
				margin-top: 1rem;

				& > div {
					margin-bottom: 0.4rem;
				}

				.location {
					color: $font-color;
				}

				.remote {
					border-radius: 10px;
					background: $secondary-color;
					color: $font-color-on-color;
					font-weight: 700;
					font-size: 13px;
					padding: 0.2rem 0.8rem;
					width: min-content;
				}
			}
		}
		hr {
			border: 1px solid darken($color: $background, $amount: 5);
			width: calc(100% + 4rem);
			margin-left: -2rem;
		}
	}
</style>

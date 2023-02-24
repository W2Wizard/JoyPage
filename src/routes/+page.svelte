<script lang="ts">
import Highcharts, { type HTMLDOMElement } from "highcharts";
import { onMount } from "svelte";
import { myData } from "$lib/stores/data";

let JoyChart: HTMLDivElement;

onMount(() => {
	const options: Highcharts.Options = {
		chart: {
			type: "area",
		},
		accessibility: {
			description:
				"Image description: A chart showing the overall joy in life on a day by day basis.",
		},
		title: {
			text: "Joy in life",
		},
		subtitle: {
			text: "My overall joy in life on a day by day basis.",
		},
		series: [
			{
				name: "Joy",
				data: $myData,
			},
		]
	};

	const chart = Highcharts.chart(JoyChart, options);
	myData.subscribe((data) => {
		console.log("data changed!");
		chart.series[0].update({
			data: data
		}, true);
		// chart.reflow();
		// chart.redraw();
	});
});
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div bind:this={JoyChart} id="joychart" />
</section>

<style>
  section {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 0.6;
  }

  #joychart {
	width: 100%;
	height: 400px;
	border-radius: 8px;
  }
</style>

import sortDataFacts from './sortDataFacts';

let template = `
<div>
	<a class="ui big red circular label" v-if="showStoryPieceNumber" v-on:dblclick="dblclickStoryPieceNumber">{{ index + 1 }}</a>
	<div class="single-motif-container" v-bind:style="singleMotifStyleObject">
		<div v-bind:id="leftId" class="split single-node-container" v-on:dblclick="dblclicked('left')" v-bind:style="leftSingleNodeStyleObject">
			<div v-bind:id="leftTextPanelId" class="split">
				<text-panel v-bind:arrows="leftArrows" v-bind:dataFacts="leftDataFacts" v-bind:ref="leftTextPanelId" v-bind:dataFactsContents="leftDataFactsContents"></text-panel>
			</div>
			<div v-bind:id="leftVisPanelId" class="split">
				<vis-panel v-bind:visSpec="leftVisSpec" 
					v-bind:nodeName="leftNodeName" 
					v-bind:chartComicStyle="chartComicStyle"
					v-bind:chartTheme="chartTheme">
				</vis-panel>
			</div>
		</div>
		<div v-bind:id="rightId" class="split">
			<div v-bind:id="rightUpperId" class="split single-node-container" v-on:dblclick="dblclicked('rightUpper')" v-bind:style="rightUpperSingleNodeStyleObject">
				<div v-bind:id="rightUpperVisPanelId" class="split">
					<vis-panel v-bind:visSpec="rightUpperVisSpec" 
						v-bind:nodeName="rightUpperNodeName" 
						v-bind:chartComicStyle="chartComicStyle"
						v-bind:chartTheme="chartTheme">
					</vis-panel>
				</div>
				<div v-bind:id="rightUpperTextPanelId" class="split">
					<text-panel v-bind:arrows="rightUpperArrows" v-bind:dataFacts="rightUpperDataFacts" v-bind:ref="rightUpperTextPanelId" v-bind:dataFactsContents="rightUpperDataFactsContents"></text-panel>
				</div>
			</div>
			<div v-bind:id="rightBottomId" class="split">
				<div v-bind:id="rightBottomLeftId" class="split single-node-container" v-on:dblclick="dblclicked('rightBottomLeft')" v-bind:style="rightBottomLeftSingleNodeStyleObject">
					<div v-bind:id="rightBottomLeftTextPanelId" class="split">
						<text-panel v-bind:arrows="rightBottomLeftArrows" v-bind:dataFacts="rightBottomLeftDataFacts" v-bind:ref="rightBottomLeftTextPanelId" v-bind:dataFactsContents="rightBottomLeftDataFactsContents"></text-panel>
					</div>
					<div v-bind:id="rightBottomLeftVisPanelId" class="split">
						<vis-panel v-bind:visSpec="rightBottomLeftVisSpec" 
							v-bind:nodeName="rightBottomLeftNodeName" 
							v-bind:chartComicStyle="chartComicStyle"
							v-bind:chartTheme="chartTheme">
						</vis-panel>
					</div>
				</div>
				<div v-bind:id="rightBottomRightId" class="split single-node-container" v-on:dblclick="dblclicked('rightBottomRight')" v-bind:style="rightBottomRightSingleNodeStyleObject">
					<div v-bind:id="rightBottomRightTextPanelId" class="split">
						<text-panel v-bind:arrows="rightBottomRightArrows" v-bind:dataFacts="rightBottomRightDataFacts" v-bind:ref="rightBottomRightTextPanelId" v-bind:dataFactsContents="rightBottomRightDataFactsContents"></text-panel>
					</div>
					<div v-bind:id="rightBottomRightVisPanelId" class="split">
						<vis-panel v-bind:visSpec="rightBottomRightVisSpec" 
							v-bind:nodeName="rightBottomRightNodeName" 
							v-bind:chartComicStyle="chartComicStyle"
							v-bind:chartTheme="chartTheme">
						</vis-panel>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
`;

Vue.component('four-nodes-right-unequal-branch', {
	template: template,
	props: {
		index: Number,
		layoutData: {
			default: {}
		},
		reset: Boolean,
		showStoryPieceNumber: Boolean,
		chartComicStyle: Boolean,
		chartTheme: String
	},
	data() {
		return {
			singleMotifStyleObject: {},
			leftSingleNodeStyleObject: {},
			rightUpperSingleNodeStyleObject: {},
			rightBottomLeftSingleNodeStyleObject: {},
			rightBottomRightSingleNodeStyleObject: {},
			leftId: "four-nodes-right-unequal-branch-left-node-" + this.index,
			leftTextPanelId: "four-nodes-right-unequal-branch-left-text-panel-" + this.index,
			leftVisPanelId: "four-nodes-right-unequal-branch-left-vis-panel-" + this.index,
			rightId: "four-nodes-right-unequal-branch-right-three-nodes-" + this.index,
			rightUpperId: "four-nodes-right-unequal-branch-right-upper-node-" + this.index,
			rightUpperTextPanelId: "four-nodes-right-unequal-branch-right-upper-text-panel-" + this.index,
			rightUpperVisPanelId: "four-nodes-right-unequal-branch-right-upper-vis-panel-" + this.index,
			rightBottomId: "four-nodes-right-unequal-branch-right-bottom-two-nodes-" + this.index,
			rightBottomLeftId: "four-nodes-right-unequal-branch-right-bottom-left-node-" + this.index,
			rightBottomLeftTextPanelId: "four-nodes-right-unequal-branch-right-bottom-left-text-panel-" + this.index,
			rightBottomLeftVisPanelId: "four-nodes-right-unequal-branch-right-bottom-left-vis-panel-" + this.index,
			rightBottomRightId: "four-nodes-right-unequal-branch-right-bottom-right-node-" + this.index,
			rightBottomRightTextPanelId: "four-nodes-right-unequal-branch-right-bottom-right-text-panel-" + this.index,
			rightBottomRightVisPanelId: "four-nodes-right-unequal-branch-right-bottom-right-vis-panel-" + this.index,
			leftArrows: ["bottom-left", ""],
			rightUpperArrows: ["bottom-left", ""],
			rightBottomLeftArrows: ["bottom-left", ""],
			rightBottomRightArrows: ["bottom-left", ""]
		};
	},
	mounted: function() {
		Split(["#four-nodes-right-unequal-branch-left-node-" + this.index, "#four-nodes-right-unequal-branch-right-three-nodes-" + this.index], {
			direction: 'horizontal',
			sizes: [40, 60],
			minSize: [0, 0],
			gutterSize: 10,
			gutterStyle: (dimension, gutterSize, index) => ({
        'width': gutterSize + 'px',
        'background-color': 'transparent'
    	})
		});
		Split(["#four-nodes-right-unequal-branch-right-upper-node-" + this.index, "#four-nodes-right-unequal-branch-right-bottom-two-nodes-" + this.index], {
			direction: 'vertical',
			sizes: [50, 50],
			minSize: [0, 0],
			gutterSize: 10,
			gutterStyle: (dimension, gutterSize, index) => ({
        'height': gutterSize + 'px',
        'background-color': 'transparent'
    	})
		});
		Split(["#four-nodes-right-unequal-branch-right-bottom-left-node-" + this.index, "#four-nodes-right-unequal-branch-right-bottom-right-node-" + this.index], {
			direction: 'horizontal',
			sizes: [50, 50],
			minSize: [0, 0],
			gutterSize: 10,
			gutterStyle: (dimension, gutterSize, index) => ({
        'width': gutterSize + 'px',
        'background-color': 'transparent'
    	})
		});
		Split(["#four-nodes-right-unequal-branch-left-text-panel-" + this.index, "#four-nodes-right-unequal-branch-left-vis-panel-" + this.index], {
			direction: 'vertical',
			sizes: [30, 70],
			minSize: [0, 0],
			gutterSize: 3
		});
		Split(["#four-nodes-right-unequal-branch-right-upper-vis-panel-" + this.index, "#four-nodes-right-unequal-branch-right-upper-text-panel-" + this.index], {
			direction: 'horizontal',
			sizes: [60, 40],
			minSize: [0, 0],
			gutterSize: 3
		});
		Split(["#four-nodes-right-unequal-branch-right-bottom-left-text-panel-" + this.index, "#four-nodes-right-unequal-branch-right-bottom-left-vis-panel-" + this.index], {
			direction: 'vertical',
			sizes: [30, 70],
			minSize: [0, 0],
			gutterSize: 3
		});
		Split(["#four-nodes-right-unequal-branch-right-bottom-right-text-panel-" + this.index, "#four-nodes-right-unequal-branch-right-bottom-right-vis-panel-" + this.index], {
			direction: 'vertical',
			sizes: [30, 70],
			minSize: [0, 0],
			gutterSize: 3
		});
	},
	computed: {
		leftVisSpec: function() {
			return this.layoutData.mst.chartInfo.sourceCode;
		},
		rightUpperVisSpec: function() {
			return this.layoutData.mst.children[0].chartInfo.sourceCode;
		},
		rightBottomLeftVisSpec: function() {
			return this.layoutData.mst.children[1].chartInfo.sourceCode;
		},
		rightBottomRightVisSpec: function() {
			return this.layoutData.mst.children[1].children[0].chartInfo.sourceCode;
		},
		leftNodeName: function() {
			return this.layoutData.mst.name;
		},
		rightUpperNodeName: function() {
			return this.layoutData.mst.children[0].name;
		},
		rightBottomLeftNodeName: function() {
			return this.layoutData.mst.children[1].name;
		},
		rightBottomRightNodeName: function() {
			return this.layoutData.mst.children[1].children[0].name;
		},
		leftDataFacts: function() {
			let sortedDataFacts = sortDataFacts({
				targetChartDataFacts: this.layoutData.mst.chartInfo.dataFacts,
				firstRelatedChartDataFacts: this.layoutData.mst.children[0].chartInfo.dataFacts,
				secondRelatedChartDataFacts: this.layoutData.mst.children[1].chartInfo.dataFacts
			});
			this.layoutData.mst.chartInfo.sortedDataFacts = sortedDataFacts;
			this.layoutData.mst.chartInfo.selectedDataFactsIndex = new Set(this.layoutData.mst.chartInfo.selectedDataFactsIndex);
			let selectedDataFactsIndexSet = this.layoutData.mst.chartInfo.selectedDataFactsIndex;
			return sortedDataFacts.filter((d, i) => selectedDataFactsIndexSet.has(i));
		},
		rightUpperDataFacts: function() {
			let sortedDataFacts = sortDataFacts({
				targetChartDataFacts: this.layoutData.mst.children[0].chartInfo.dataFacts,
				firstRelatedChartDataFacts: this.layoutData.mst.chartInfo.dataFacts
			});
			this.layoutData.mst.children[0].chartInfo.sortedDataFacts = sortedDataFacts;
			this.layoutData.mst.children[0].chartInfo.selectedDataFactsIndex = new Set(this.layoutData.mst.children[0].chartInfo.selectedDataFactsIndex);
			let selectedDataFactsIndexSet = this.layoutData.mst.children[0].chartInfo.selectedDataFactsIndex;
			return sortedDataFacts.filter((d, i) => selectedDataFactsIndexSet.has(i));
		},
		rightBottomLeftDataFacts: function() {
			let sortedDataFacts = sortDataFacts({
				targetChartDataFacts: this.layoutData.mst.children[1].chartInfo.dataFacts,
				firstRelatedChartDataFacts: this.layoutData.mst.chartInfo.dataFacts,
				secondRelatedChartDataFacts: this.layoutData.mst.children[1].children[0].chartInfo.dataFacts
			});
			this.layoutData.mst.children[1].chartInfo.sortedDataFacts = sortedDataFacts;
			this.layoutData.mst.children[1].chartInfo.selectedDataFactsIndex = new Set(this.layoutData.mst.children[1].chartInfo.selectedDataFactsIndex);
			let selectedDataFactsIndexSet = this.layoutData.mst.children[1].chartInfo.selectedDataFactsIndex;
			return sortedDataFacts.filter((d, i) => selectedDataFactsIndexSet.has(i));
		},
		rightBottomRightDataFacts: function() {
			let sortedDataFacts = sortDataFacts({
				targetChartDataFacts: this.layoutData.mst.children[1].children[0].chartInfo.dataFacts,
				firstRelatedChartDataFacts: this.layoutData.mst.children[1].chartInfo.dataFacts
			});
			this.layoutData.mst.children[1].children[0].chartInfo.sortedDataFacts = sortedDataFacts;
			this.layoutData.mst.children[1].children[0].chartInfo.selectedDataFactsIndex = new Set(this.layoutData.mst.children[1].children[0].chartInfo.selectedDataFactsIndex);
			let selectedDataFactsIndexSet = this.layoutData.mst.children[1].children[0].chartInfo.selectedDataFactsIndex;
			return sortedDataFacts.filter((d, i) => selectedDataFactsIndexSet.has(i));
		},
		leftDataFactsContents: function() {
			return this.layoutData.mst.chartInfo.dataFactsContents;
		},
		rightUpperDataFactsContents: function() {
			return this.layoutData.mst.children[0].chartInfo.dataFactsContents;
		},
		rightBottomLeftDataFactsContents: function() {
			return this.layoutData.mst.children[1].chartInfo.dataFactsContents;
		},
		rightBottomRightDataFactsContents: function() {
			return this.layoutData.mst.children[1].children[0].chartInfo.dataFactsContents;
		}
	},
	watch: {
		reset: function(value) {
			if(value) {
				this.leftSingleNodeStyleObject = {};
				this.rightUpperSingleNodeStyleObject = {};
				this.rightBottomLeftSingleNodeStyleObject = {};
				this.rightBottomRightSingleNodeStyleObject = {};
			}
		},
	},
	methods: {
		dblclickStoryPieceNumber: function() {
			if(Object.keys(this.singleMotifStyleObject).length == 0) {
				this.singleMotifStyleObject = {
					border: "5px solid #639fff"
				};
				this.$emit('selectStoryPiece', {
					motif: this.layoutData,
					index: this.index
				});
			} else {
				this.singleMotifStyleObject = {};
				this.$emit('unselectStoryPiece');
			}
		},
		dblclicked: function(position) {
			if(position == 'left') {
				if(Object.keys(this.leftSingleNodeStyleObject).length == 0) {
					this.leftSingleNodeStyleObject = {
						border: "2px solid #639fff"
					};
					this.layoutData.mst.chartInfo.dataFactsContents = this.$refs[this.leftTextPanelId].getEditorContents();
					this.$emit('selectSwitch', {
						node: this.layoutData.mst,
						index: this.index
					});
				} else {
					this.leftSingleNodeStyleObject = {};
					this.$emit('unselectSwitch');
				}
			} else if(position == 'rightUpper') {
				if(Object.keys(this.rightUpperSingleNodeStyleObject).length == 0) {
					this.rightUpperSingleNodeStyleObject = {
						border: "2px solid #639fff"
					};
					this.layoutData.mst.children[0].chartInfo.dataFactsContents = this.$refs[this.rightUpperTextPanelId].getEditorContents();
					this.$emit('selectSwitch', {
						node: this.layoutData.mst.children[0],
						index: this.index
					});
				} else {
					this.rightUpperSingleNodeStyleObject = {};
					this.$emit('unselectSwitch');
				}
			} else if(position == 'rightBottomLeft') {
				if(Object.keys(this.rightBottomLeftSingleNodeStyleObject).length == 0) {
					this.rightBottomLeftSingleNodeStyleObject = {
						border: "2px solid #639fff"
					};
					this.layoutData.mst.children[1].chartInfo.dataFactsContents = this.$refs[this.rightBottomLeftTextPanelId].getEditorContents();
					this.$emit('selectSwitch', {
						node: this.layoutData.mst.children[1],
						index: this.index
					});
				} else {
					this.rightBottomLeftSingleNodeStyleObject = {};
					this.$emit('unselectSwitch');
				}
			}	else {
				if(Object.keys(this.rightBottomRightSingleNodeStyleObject).length == 0) {
					this.rightBottomRightSingleNodeStyleObject = {
						border: "2px solid #639fff"
					};
					this.layoutData.mst.children[1].children[0].chartInfo.dataFactsContents = this.$refs[this.rightBottomRightTextPanelId].getEditorContents();
					this.$emit('selectSwitch', {
						node: this.layoutData.mst.children[1].children[0],
						index: this.index
					});
				} else {
					this.rightBottomRightSingleNodeStyleObject = {};
					this.$emit('unselectSwitch');
				}
			}
		}
	}
});
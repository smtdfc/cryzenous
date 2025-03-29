import { RumiousComponent, createElementRef } from 'rumious';

export class NodeHeaderComponent extends RumiousComponent {
  static tag = "cryzenous-node-header";
  
  onCreate() {
    this.iconRef = createElementRef();
    this.context = this.props.context;
    this.node = this.props.node;
    this.controller = this.props.controller;
  }
  
  onRender() {
    this.controller.on("state", (state) => {
      console.log(state)
      this.iconRef.target.classList[state === "ERROR" ? "remove" : "add"]("d-none");
    });
  }
  
  template() {
    const { title, subtitle } = this.props;
    return (
      <>
        <h3 class="node-title">
          {title}
          <i ref="$iconRef" class="material-icons cryzenous-error-icon d-none">warning</i>
        </h3>
        <span class="node-subtitle">{subtitle}</span>
      </>
    );
  }
}
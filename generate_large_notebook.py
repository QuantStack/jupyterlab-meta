import nbformat
from nbformat.v4 import new_notebook, new_code_cell, new_markdown_cell

# Create a new notebook
nb = new_notebook()

# Specify the default kernel (IPython)
nb.metadata.kernelspec = {
    "name": "python3",
    "display_name": "Python 3",
    "language": "python",
}

# Add the title and Table of Contents (ToC)
nb.cells.append(new_markdown_cell("# Large Test Notebook"))
nb.cells.append(
    new_markdown_cell(
        "## Table of Contents\n\n"
        "- [Papermill](#papermill)\n"
        "- [ipywidgets](#ipywidgets)\n"
        "- [Dash](#dash)\n"
        "- [jupyterlab-lsp](#jupyterlab-lsp)\n"
        "- [ipydatagrid](#ipydatagrid)\n"
        "- [ipympl](#ipympl)\n"
        "- [jupyterlab-code-formatter](#jupyterlab-code-formatter)\n"
        "- [dummy-code-cells](#dummy-code-cells)"
    )
)


# Define sample code for each extension
extensions = {
    "Papermill": """
import tempfile
import papermill as pm

with tempfile.NamedTemporaryFile(delete=False, suffix='.ipynb') as temp_output:
    pm.execute_notebook(
        "test-papermill.ipynb", 
        temp_output.name,        
        parameters={"param1": "TestRun", "param2": 99},
        kernel_name="python3"
    )
    print(f"Output saved to {temp_output.name}")
    output_path = temp_output.name  
output_path
""",
    "ipywidgets": """
import ipywidgets as widgets
from IPython.display import display

slider = widgets.IntSlider(value=50, min=0, max=100, description="Slider:")
button = widgets.Button(description="Click Me")
output = widgets.Output()

def on_button_click(b):
    with output:
        print("Button Clicked!")

button.on_click(on_button_click)
display(slider, button, output)
""",
    "Dash": """
from dash import dcc, html, Dash
app = Dash(__name__)
app.layout = html.Div([
    dcc.Graph(
        id='graph',
        figure={
            'data': [{'x': [1, 2, 3, 4], 'y': [10, 11, 12, 13], 'type': 'line', 'name': 'Test'}],
            'layout': {'title': 'Dash in JupyterLab'}
        }
    )
])
app.run_server(host="0.0.0.0", port=8052)
""",
    "jupyterlab-lsp": """
import numpy as np
np
""",
    "ipydatagrid": """
import numpy as np
import pandas as pd
import ipydatagrid

data = pd.DataFrame(
    np.random.randint(0, 100, size=(5, 5)), 
    columns=["A", "B", "C", "D", "E"]
)
grid = ipydatagrid.DataGrid(data, editable=True)
grid
""",
    "ipympl": """
# Activate ipympl
%matplotlib widget  

import matplotlib.pyplot as plt  
import numpy as np  

x = np.linspace(0, 10, 100)  
y = np.sin(x)  

fig, ax = plt.subplots()  
ax.plot(x, y)  
plt.show()
""",
    "jupyterlab-code-formatter": """
def             my_function(x,      y):
    print(x,            y)
""",
}

# Add one code cell for each extension
for extension_name, code in extensions.items():
    nb.cells.append(
        new_markdown_cell(
            f"## {extension_name}\n\nThis section tests the {extension_name} extension"
        )
    )
    nb.cells.append(new_code_cell(code.strip()))

# Fill with dummy cells until reaching 1000 cells
current_cell_count = len(nb.cells)
dummy_cell_count = 1000 - current_cell_count


extension_codes = list(extensions.values())
nb.cells.append(
    new_markdown_cell("## dummy-code-cells\n\nThis section contains filler code cells.")
)

while len(nb.cells) < 1000:
    for code in extension_codes:
        if len(nb.cells) < 1000:
            nb.cells.append(new_code_cell(code))
        else:
            break

# Write the notebook to a file
notebook_path = "notebooks/test-large-notebook-with-extensions.ipynb"
with open(notebook_path, "w") as f:
    nbformat.write(nb, f)

print(f"Large test notebook created: {notebook_path} with {len(nb.cells)} cells.")

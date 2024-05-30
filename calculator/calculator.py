import webview
def main():
    webview.create_window(
        "Calculator",
        "index.html",  # Path to your HTML file
        width=400,     # Set the window width
        height=600,    # Set the window height
        resizable=True
    )
    webview.start()

if __name__ == "__main__":
    main()

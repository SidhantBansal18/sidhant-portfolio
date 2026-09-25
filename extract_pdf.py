import PyPDF2
import sys
import io

# Ensure stdout is UTF-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

try:
    with open(r'C:\Users\sidha\.dsh\attachments\v1\files\08\089d45073a9ceb1da56a21d490cac71dcda6a5206a3af248156da93728cd3fe2\Sidhant_Bansal_Resume_Revised (6) (1).pdf', 'rb') as f:
        reader = PyPDF2.PdfReader(f)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        print(text)
except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
    sys.exit(1)

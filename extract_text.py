import PyPDF2
from docx import Document

def extract_pdf(path):
    text = ""
    with open(path, "rb") as f:
        reader = PyPDF2.PdfReader(f)
        for page in reader.pages:
            text += page.extract_text() + "\n"
    return text

def extract_docx(path):
    doc = Document(path)
    return "\n".join([p.text for p in doc.paragraphs])

print("--- RESUME ---")
print(extract_pdf("Sidhant_Bansal_Resume.pdf"))
print("\n--- WORK ARTIFACTS ---")
print(extract_docx("Work_Artifacts.docx"))

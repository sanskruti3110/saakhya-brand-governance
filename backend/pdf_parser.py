"""
SAAKHYA Brand Governance Platform
PyMuPDF Document Extractor
"""
import pymupdf as fitz

def extract_text_from_pdf_bytes(pdf_bytes: bytes) -> dict:
    """
    Extracts structured text, page count, and metadata from a PDF file.
    """
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    pages_text = []
    total_words = 0

    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text = page.get_text("text")
        words = len(text.split())
        total_words += words
        pages_text.append({
            "page": page_num + 1,
            "text": text,
            "word_count": words
        })

    full_text = "\n\n".join([p["text"] for p in pages_text])
    metadata = doc.metadata or {}

    return {
        "page_count": len(doc),
        "total_words": total_words,
        "metadata": metadata,
        "full_text": full_text,
        "pages": pages_text
    }

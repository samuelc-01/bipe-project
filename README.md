# 📦 Leitor de Código de Barras para NF

Sistema web para auxiliar na **conferência de notas fiscais (NF)** durante o processo de **embarque logístico**. O sistema permite capturar dados das NFs usando um leitor de código de barras, registrar data/hora e associar à transportadora de forma prática e eficiente.

---

## 🖥️ Funcionalidades

- Registro da **data e hora** do embarque
- Seleção da **transportadora**
- **Leitura de código de barras** da NF (com leitor físico ou câmera)
- Armazenamento seguro das informações para conferência posterior
- Interface limpa e responsiva, focada em operadores logísticos

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:**  
  - HTML5  
  - CSS3  
  - JavaScript (eventos e máscaras de input)

- **Backend:**  
  - PHP (procedural)  
  - MySQL (persistência de dados via PDO)

---

## 📦 Instalação Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/leitor-nf.git
cd leitor-nf

# Importe o banco de dados (ex: via phpMyAdmin ou CLI)
# Arquivo: database.sql

# Configure a conexão no arquivo /config/db.php
# Ajuste usuário, senha e nome do banco

# Execute localmente com XAMPP, WAMP ou outro servidor PHP

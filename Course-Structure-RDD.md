# Sparkly Course Structure - Read Driven Development Document

> **"Structured Learning, Simplified Delivery"**

## 📋 Executive Summary

This document defines the standardized course structure and manifest system for the Sparkly platform. Our goal is to create a portable, scalable, and developer-friendly format for packaging educational content that can be deployed anywhere from local file systems to cloud platforms.

**Status**: 🏗️ Design Phase  
**Current Focus**: Core manifest schema and folder structure definition

## 🎯 Problem Statement

Current courses lack 1:1 individualized custom mentor-like interactions.

## ✨ Sparkly Course Structure Features

Sparkly's Course Structure provides a comprehensive solution with these key capabilities:

- **JSON-Based Manifest**: Deterministic parsing for course metadata and structure
- **Hierarchical Organization**: Clear chapter/lesson folder structure for scalability  
- **Asset Co-location**: Media files organized alongside their respective content
- **AI-Powered Interactions**: Built-in support for personalized mentor-like assistance
- **Offline-First Architecture**: Complete course functionality without internet connection
- **Cross-Platform Portability**: Zip-and-deploy anywhere with filesystem access

## 👥 Target Personas

### 1. **Course Creators/Educators**
*Primary Persona*
- Want to organize course materials in a logical, maintainable structure
- Need to include various media types (videos, images, interactive content)
- Require course metadata for proper platform presentation
- Pain: Complex content organization and asset management

### 2. **Platform Developers**
*Secondary Persona*
- Need to parse course structure programmatically
- Want to render courses consistently across different environments
- Require extensible format for future feature additions
- Pain: Inconsistent course formats and parsing complexity

### 3. **Content Consumers/Learners**
*End Persona*
- Want seamless course loading and navigation
- Need offline access to course materials
- Expect rich media content to load properly
- Pain: Broken media links and poor offline experience

## 🗺️ Course Structure User Journey

### Journey Flow
```
Course Creation → Content Organization → Manifest Generation → Package Deployment → Student Consumption
```

### Step-by-Step Experience

#### 1. **Course Creation and Organization**
**Creator Goal**: Organize course content in a logical, maintainable structure

**Experience**:
- Create course directory with standard folder structure
- Organize chapters and lessons hierarchically
- Co-locate assets with their respective lessons
- Generate course manifest with metadata

**User Stories**:
- *As a course creator, I want to organize my content in folders by chapter and lesson, so that I can maintain my course materials easily*
- *As an educator, I want to include images and videos alongside my lessons, so that students get rich multimedia content*
- *As a content author, I want to define course metadata once, so that it renders consistently across platforms*



#### 2. **Course Packaging and Deployment**
**Platform Goal**: Deploy courses consistently across different environments

**User Stories**:
- *As a platform developer, I want to parse course structure from JSON, so that I can render courses programmatically*
- *As a deployment engineer, I want to package courses as zip files, so that they can be distributed easily*
- *As a system administrator, I want to validate course structure, so that I can prevent broken deployments*



#### 3. **Student Course Consumption**
**Student Goal**: Access course content seamlessly with rich media support

**User Stories**:
- *As a student, I want courses to load quickly with all media intact, so that I can focus on learning*
- *As a learner, I want to access courses offline, so that I can study anywhere without internet*
- *As a course participant, I want to navigate through lessons easily, so that I can follow the learning progression*

## 📱 Course Structure Specifications

### Enhanced Directory Structure

```
course-root/
├── course.manifest.json          # Main course manifest
├── course.manifest.sudo          # SudoLang program for course manifest (transpiled)
├── course.pricing.json           # Course-level pricing configuration
├── pwa.manifest.json             # PWA configuration (optional)
├── course-icon.png               # Course icon (512x512)
├── course-splash.png             # Loading splash screen
├── shared/                       # Reusable content library
│   ├── components/               # Reusable lesson components
│   ├── templates/                # Lesson templates
│   └── assets/                   # Shared assets
├── assets/                       # Global course assets
│   ├── images/
│   ├── videos/
│   ├── audio/
│   └── documents/
└── sections/                     # Course content organization
    ├── 01-introduction/
    │   ├── section.json          # Section metadata
    │   ├── 01-welcome/
    │   │   ├── lesson.json       # Lesson metadata
    │   │   ├── lesson.pricing.json # Lesson-specific pricing
    │   │   ├── content.md        # Lesson content (Markdown)
    │   │   ├── assets/           # Lesson-specific assets
    │   │   │   ├── diagram.png
    │   │   │   ├── diagram.alt.txt
    │   │   │   └── example.mp4
    │   │   └── assessments/      # Lesson assessments
    │   │       ├── quiz.json
    │   │       ├── exercise.json
    │   │       └── project.json
    │   └── 02-overview/
    │       ├── lesson.json
    │       ├── lesson.pricing.json
    │       ├── content.md
    │       ├── assets/
    │       └── assessments/
    └── 02-fundamentals/
        ├── section.json
        ├── 01-concepts/
        │   ├── section.json      # Nested section
        │   ├── 01-basic-concepts/
        │   │   ├── lesson.json
        │   │   ├── lesson.pricing.json
        │   │   ├── content.md
        │   │   ├── assets/
        │   │   └── assessments/
        │   └── 02-advanced-concepts/
        │       ├── lesson.json
        │       ├── lesson.pricing.json
        │       ├── content.md
        │       ├── assets/
        │       └── assessments/
        └── 02-practice/
            ├── lesson.json
            ├── lesson.pricing.json
            ├── content.md
            ├── assets/
            └── assessments/
```

### Enhanced Course Manifest Schema (`course.manifest.json`)

```sudo
interface CourseManifest {
  schemaVersion: string
  course: Course
}

interface Course {
  id: cuid2
  title: string
  description: string
  version: string
  contributors: Contributor[]
  metadata: CourseMetadata
}

interface Contributor {
  name: string
  email?: string
  bio: string
  avatar: string
  role: "leadAuthor" | "author" | "editor" | "reviewer"
  social: SocialLinks
}

interface SocialLinks {
  twitter?: string
  website?: string
  linkedin?: string
  github?: string
}

interface CourseMetadata {
  tags: string[]
  targetAudience: string[]
  prerequisites: string[]
  learningOutcomes: string[]
  createdAt: string
  updatedAt: string
}
```



### Course Pricing Schema (`course.pricing.json`)

```sudo
interface CoursePricing {
  version: string
  courseId: cuid2
  models: PricingModel[]
  freePreview: boolean
}

interface PricingModel {
  type: "subscription" | "one_time"
  price: number
  interval?: "month" | "year" | "quarter"
}
```



### Section Schema (`section.json`)

```sudo
interface Section {
  id: cuid2
  title: string
  displayName: string
  description: string
}
```



### Lesson Schema (`lesson.json`)

```sudo
interface Lesson {
  id: cuid2
  title: string
  displayName: string
  description: string
}
```





### Lesson Pricing Schema (`lesson.pricing.json`)

```sudo
interface LessonPricing {
  version: string
  lessonId: cuid2
  price: number
  freePreview: boolean
}
```



### PWA Compliance

The course player should implement standard PWA manifest functionality for offline support and app-like behavior. This follows the [W3C Web App Manifest specification](https://www.w3.org/TR/appmanifest/) and doesn't require custom schema definition.

## 🔄 Content Reusability & Updates

### Content Library Organization

```
shared/
├── components/           # Reusable UI components
│   ├── ai-chat-widget.json
│   ├── video-player.json
│   └── markdown-renderer.json
├── assets/             # Shared media assets
│   ├── icons/
│   ├── backgrounds/
│   └── audio/
└── styles/             # Shared styling
    ├── themes/
    └── layouts/
```

---

**Made with ❤️ by the Sparkly community**

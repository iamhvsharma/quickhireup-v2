import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  Eye, 
  Book, 
  Video, 
  File 
} from 'lucide-react';

const Resources = () => {
  const resources = [
    {
      id: 1,
      title: "Complete Web Development Guide",
      type: "PDF",
      size: "2.5 MB",
      category: "Technical",
      downloadUrl: "/path/to/webdev-guide.pdf",
      viewUrl: "/path/to/view/webdev-guide",
      icon: FileText
    },
    {
      id: 2,
      title: "System Design Interview Preparation",
      type: "Video",
      duration: "45 mins",
      category: "Interview Prep",
      downloadUrl: "/path/to/system-design.mp4",
      viewUrl: "/path/to/view/system-design",
      icon: Video
    },
    // Add more resources
  ];

  const handleDownload = async (resource) => {
    try {
      const response = await fetch(resource.downloadUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = resource.title;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleView = (resource) => {
    window.open(resource.viewUrl, '_blank');
  };

  const getIconByType = (type) => {
    switch (type) {
      case 'PDF':
        return FileText;
      case 'Video':
        return Video;
      case 'Book':
        return Book;
      default:
        return File;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Learning Resources</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => {
          const ResourceIcon = getIconByType(resource.type);
          
          return (
            <Card key={resource.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <ResourceIcon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{resource.title}</h3>
                    <p className="text-sm text-gray-500">
                      {resource.type} • {resource.size || resource.duration}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleView(resource)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleDownload(resource)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Resources; 